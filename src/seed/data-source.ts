import 'dotenv/config';

import { DataSource } from 'typeorm';

import { ForceType } from '../filters/entities/force-type.entity';
import { ItemType } from '../filters/entities/item-type.entity';
import { Location } from '../filters/entities/location.entity';
import { ResourceType } from '../filters/entities/resource-type.entity';
import { ServiceType } from '../filters/entities/service-type.entity';
import { UnitNode } from '../filters/entities/unit-node.entity';
import { Item } from '../shibutzim/entities/item.entity';
import { Resource } from '../shibutzim/entities/resource.entity';
import { Shibutz } from '../shibutzim/entities/shibutz.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'shibutzim_db',
  entities: [
    Shibutz,
    Resource,
    Item,
    ResourceType,
    ServiceType,
    UnitNode,
    Location,
    ItemType,
    ForceType,
  ],
  synchronize: false,
});
