import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TreeRepository, DataSource } from "typeorm";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Shibutz } from "./entities/shibutz.entity";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";

@Injectable()
export class ShibutzimService {
  // Tree repository for hierarchical unit queries
  private unitTreeRepo: TreeRepository<UnitNode>;

  constructor(
    @InjectRepository(Shibutz)
    private readonly shibutzRepo: Repository<Shibutz>,
    private readonly dataSource: DataSource
  ) {
    // Initialize tree repository manually (not injectable)
    this.unitTreeRepo = this.dataSource.getTreeRepository(UnitNode);
  }

  async getShibutzim(query: GetShibutzimDto) {
    const {
      from,
      to,
      unitIds,
      serviceTypeIds,
      resourceTypeIds,
      locationIds,
    } = query;

    const unitsWithChildren: string[] = [];

    // Expand units to include all descendants
    for (const unitId of unitIds) {
      const node = await this.unitTreeRepo.findOne({
        where: { id: unitId },
      });

      if (!node) continue;

      const descendants = await this.unitTreeRepo.findDescendants(node);
      unitsWithChildren.push(...descendants.map((d) => d.id));
    }

    // Early exit if no relevant units
    if (!unitsWithChildren.length) return [];

    // Base query with joins
    const qb = this.shibutzRepo
      .createQueryBuilder("shibutz")
      .leftJoinAndSelect("shibutz.resources", "resource") // needed for response mapping
      .leftJoinAndSelect("resource.items", "item")
      .leftJoinAndSelect("item.itemType", "itemType")
      .leftJoinAndSelect("shibutz.location", "location")
      .leftJoinAndSelect("shibutz.serviceType", "serviceType")
      .leftJoinAndSelect("resource.resourceType", "resourceType")
      .where("shibutz.unitNodeId IN (:...unitIds)", {
        unitIds: unitsWithChildren,
      })
      .andWhere("shibutz.dateBegin >= :from", { from }) // start bound
      .andWhere("shibutz.dateEnd <= :to", { to }); // end bound

    // Optional filter: service types
    if (serviceTypeIds?.length) {
      qb.andWhere("shibutz.serviceTypeId IN (:...serviceTypeIds)", {
        serviceTypeIds,
      });
    }

    // Optional filter: resource types (EXISTS for performance)
    if (resourceTypeIds?.length) {
      qb.andWhere(
        `
        EXISTS (
          SELECT 1
          FROM core.resource r
          WHERE r."shibutzId" = shibutz.id
          AND r."resourceTypeId" IN (:...resourceTypeIds)
        )
      `,
        { resourceTypeIds }
      );
    }

    // Optional filter: locations
    if (locationIds?.length) {
      qb.andWhere("shibutz.locationId IN (:...locationIds)", {
        locationIds,
      });
    }

    const results = await qb.getMany();

    // Shape response (flatten relations to names)
    return results.map(
      ({
        location,
        serviceType,
        resources,
        locationId,
        serviceTypeId,
        ...rest
      }) => ({
        ...rest,

        location: location?.name ?? null,
        serviceType: serviceType?.name ?? null,

        // Map nested resources
        resources: resources.map(
          ({ resourceType, resourceTypeId, items, ...rRest }) => ({
            ...rRest,
            resourceType: resourceType?.name ?? null,
            items: items.map(({ itemType, itemTypeId, ...iRest }) => ({
              ...iRest,
              itemType: itemType?.name ?? null,
            })),
          })
        ),
      })
    );
  }
}