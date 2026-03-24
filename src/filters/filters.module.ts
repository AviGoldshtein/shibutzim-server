import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { UnitNode } from './entities/unit-node.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResourceType } from "./entities/resource-type.entity";
import { ServiceType } from "./entities/service-type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitNode, ResourceType, ServiceType])
  ],
  controllers: [FiltersController],
  providers: [FiltersService]
})
export class FiltersModule {}
