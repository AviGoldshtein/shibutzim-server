import { DataSource } from "typeorm";
import { Shibutz } from "../shibutzim/entities/shibutz.entity";
import { Resource } from "../shibutzim/entities/resource.entity";
import { Item } from "../shibutzim/entities/item.entity";

import { ResourceType } from "../filters/entities/resource-type.entity";
import { ItemType } from "../filters/entities/item-type.entity";
import { ServiceType } from "../filters/entities/service-type.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Location } from "../filters/entities/location.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "shibutzim_db",
  entities: [Shibutz, Resource, Item, ResourceType, ServiceType, UnitNode, Location, ItemType],
  synchronize: false,
});