import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Unit } from "./entities/unit.entity";
import { GetShibutzimDto } from "./dto/get-shibutzim.dto";

@Injectable()
export class ShibutzimService {
  constructor(
    @InjectRepository(Unit)
    private unitRepo: Repository<Unit>,
  ) {}

  async getShibutzim(query: GetShibutzimDto) {
    const { from, to, unitIds, serviceTypes, resourceTypes } = query;

    const qb = this.unitRepo
      .createQueryBuilder("unit")
      .leftJoinAndSelect("unit.gdudim", "gdud")
      .leftJoinAndSelect("gdud.shibutzim", "shibutz")
      .leftJoinAndSelect("shibutz.resources", "resource")
      .leftJoinAndSelect("resource.items", "item")

      // סינון לפי יחידות
      .where("unit.id IN (:...unitIds)", { unitIds })

      // סינון לפי תאריכים
      .andWhere("shibutz.dateBegin >= :from", { from })
      .andWhere("shibutz.dateEnd <= :to", { to });

    // סינון לפי serviceTypes
    if (serviceTypes?.length) {
      qb.andWhere("shibutz.serviceType IN (:...serviceTypes)", {
        serviceTypes,
      });
    }

    // סינון לפי resourceTypes
    if (resourceTypes?.length) {
      qb.andWhere("resource.categoryName IN (:...resourceTypes)", {
        resourceTypes,
      });
    }

    return qb.getMany();
  }
}