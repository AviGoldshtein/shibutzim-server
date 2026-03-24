import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { UnitNode } from './entities/unit-node.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitNode])
  ],
  controllers: [FiltersController],
  providers: [FiltersService]
})
export class FiltersModule {}
