import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TreeRepository, DataSource, SelectQueryBuilder } from "typeorm";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Shibutz } from "./entities/shibutz.entity";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";

@Injectable()
export class ShibutzimService {
  private unitTreeRepo: TreeRepository<UnitNode>;

  constructor(
    @InjectRepository(Shibutz)
    private readonly shibutzRepo: Repository<Shibutz>,
    private readonly dataSource: DataSource
  ) {
    this.unitTreeRepo = this.dataSource.getTreeRepository(UnitNode);
  }

  async getShibutzim(query: GetShibutzimDto) {
    const unitsWithDescendants = await this.getUnitsWithDescendants(
      query.unitIds
    );

    if (!unitsWithDescendants.length) return [];

    const shibutzim = await this.fetchShibutzimFromDb(
      unitsWithDescendants,
      query
    );

    return this.normalizeShibutzim(shibutzim);
  }

  private async getUnitsWithDescendants(unitIds: string[]): Promise<string[]> {
    const result: string[] = [];

    for (const unitId of unitIds) {
      const node = await this.unitTreeRepo.findOne({
        where: { id: unitId },
      });

      if (!node) continue;

      const descendants = await this.unitTreeRepo.findDescendants(node);
      result.push(...descendants.map((d) => d.id));
    }

    return result;
  }

  private async fetchShibutzimFromDb(
    unitIds: string[],
    query: GetShibutzimDto
  ): Promise<Shibutz[]> {
    const {
      from,
      to,
      serviceTypeIds,
      resourceTypeIds,
      locationIds,
    } = query;

    const qb = this.buildBaseQuery(unitIds, from, to);

    this.applyOptionalFilters(qb, {
      serviceTypeIds,
      resourceTypeIds,
      locationIds,
    });

    return qb.getMany();
  }

  private buildBaseQuery(
    unitIds: string[],
    from: string,
    to: string
  ): SelectQueryBuilder<Shibutz> {
    return this.shibutzRepo
      .createQueryBuilder("shibutz")
      .leftJoinAndSelect("shibutz.resources", "resource")
      .leftJoinAndSelect("shibutz.unitNode", "unitNode")
      .leftJoinAndSelect("shibutz.forceType", "forceType")
      .leftJoinAndSelect("resource.items", "item")
      .leftJoinAndSelect("item.itemType", "itemType")
      .leftJoinAndSelect("shibutz.location", "location")
      .leftJoinAndSelect("shibutz.serviceType", "serviceType")
      .leftJoinAndSelect("resource.resourceType", "resourceType")
      .where("shibutz.unitNodeId IN (:...unitIds)", { unitIds })
      .andWhere("shibutz.dateBegin >= :from", { from })
      .andWhere("shibutz.dateEnd <= :to", { to });
  }

  private applyOptionalFilters(
    qb: SelectQueryBuilder<Shibutz>,
    filters: {
      serviceTypeIds?: string[];
      resourceTypeIds?: string[];
      locationIds?: string[];
    }
  ) {
    const { serviceTypeIds, resourceTypeIds, locationIds } = filters;

    if (serviceTypeIds?.length) {
      qb.andWhere("shibutz.serviceTypeId IN (:...serviceTypeIds)", {
        serviceTypeIds,
      });
    }

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

    if (locationIds?.length) {
      qb.andWhere("shibutz.locationId IN (:...locationIds)", {
        locationIds,
      });
    }
  }

  private normalizeShibutzim(shibutzim: Shibutz[]) {
    return shibutzim.map(
      ({
        location,
        serviceType,
        directCost,
        costOfItems,
        forceType,
        resources,
        locationId,
        serviceTypeId,
        forceTypeId,
        unitNodeId,
        unitNode,
        ...rest
      }) => ({
        ...rest,

        directCost: Number(directCost),
        costOfItems: Number(costOfItems),
        location: location?.name ?? null,
        serviceType: serviceType?.name ?? null,
        forceType: forceType?.name ?? null,
        unitId: unitNode?.label ?? null,

        // Map nested resources
        resources: resources.map(
          ({ resourceType, resourceTypeId, items, ...rRest }) => ({
            ...rRest,
            resourceType: resourceType?.name ?? null,
            items: items.map(({ itemType, itemTypeId, unitCost, ...iRest }) => ({
              ...iRest,
              itemType: itemType?.name ?? null,
              unitCost: Number(unitCost)
            })),
          })
        ),
      })
    );
  }
}
