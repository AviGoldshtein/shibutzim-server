import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities/item.entity';
import { Resource } from './entities/resource.entity';
import { Shibutz } from './entities/shibutz.entity';
import { ShibutzimController } from './shibutzim.controller';
import { ShibutzimService } from './shibutzim.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shibutz, Resource, Item])],
  controllers: [ShibutzimController],
  providers: [ShibutzimService],
})
export class ShibutzimModule {}
