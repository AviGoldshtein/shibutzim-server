import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShibutzimService } from "./shibutzim.service";
import { ShibutzimController } from "./shibutzim.controller";

import { Shibutz } from "./entities/shibutz.entity";
import { Resource } from "./entities/resource.entity";
import { Item } from "./entities/item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Shibutz, Resource, Item]),
  ],
  controllers: [ShibutzimController],
  providers: [ShibutzimService],
})
export class ShibutzimModule {}