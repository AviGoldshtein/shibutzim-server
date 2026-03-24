import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, TreeRepository, DataSource } from "typeorm";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Shibutz } from "./entities/shibutz.entity";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";

@Injectable()
export class ShibutzimService {
  private unitTreeRepo: TreeRepository<UnitNode>;

  constructor(
    @InjectRepository(Shibutz)
    private readonly shibutzRepo: Repository<Shibutz>,

    private readonly dataSource: DataSource,
  ) {
    this.unitTreeRepo = this.dataSource.getTreeRepository(UnitNode);
  }

  async getShibutzim(query: GetShibutzimDto) {
    const { from, to, unitIds, serviceTypes, resourceTypes } = query;

    const unitsWithChildren: string[] = [];

    for (const unitId of unitIds) {
      const node = await this.unitTreeRepo.findOne({ where: { id: unitId } });
      if (!node) {
        console.warn(`⚠️  Unit with id '${unitId}' not found. Skipping.`);
        continue;
      };

      const descendants = await this.unitTreeRepo.findDescendants(node);
      unitsWithChildren.push(...descendants.map(d => d.id));
    }

    if (!unitsWithChildren.length) return [];

    const qb = this.shibutzRepo
      .createQueryBuilder("shibutz")
      .leftJoinAndSelect("shibutz.resources", "resource")
      .leftJoinAndSelect("resource.items", "item")
      .where("shibutz.unitNodeId IN (:...unitIds)", { unitIds: unitsWithChildren })
      .andWhere("shibutz.dateBegin >= :from", { from })
      .andWhere("shibutz.dateEnd <= :to", { to });

    if (serviceTypes?.length) {
      qb.andWhere("shibutz.serviceType IN (:...serviceTypes)", { serviceTypes });
    }

    if (resourceTypes?.length) {
      qb.andWhere("resource.categoryName IN (:...resourceTypes)", { resourceTypes });
    }

    const shibutzim = await qb.getMany();
    return shibutzim;
  }
}