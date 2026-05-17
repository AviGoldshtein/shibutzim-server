import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForceType } from './entities/force-type.entity';
import { ItemType } from './entities/item-type.entity';
import { Location } from './entities/location.entity';
import { ResourceType } from './entities/resource-type.entity';
import { ServiceType } from './entities/service-type.entity';
import { UnitNode } from './entities/unit-node.entity';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitNode,
      ResourceType,
      ServiceType,
      Location,
      ItemType,
      ForceType,
    ]),
  ],
  controllers: [FiltersController],
  providers: [FiltersService],
  exports: [FiltersService],
})
export class FiltersModule {}
