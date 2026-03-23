import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShibutzimService } from "./shibutzim.service";
import { ShibutzimController } from "./shibutzim.controller";

import { Unit } from "./entities/unit.entity";
import { Gdud } from "./entities/gdud.entity";
import { Shibutz } from "./entities/shibutz.entity";
import { Resource } from "./entities/resource.entity";
import { Item } from "./entities/item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit, Gdud, Shibutz, Resource, Item]),
  ],
  controllers: [ShibutzimController],
  providers: [ShibutzimService],
})
export class ShibutzimModule {}