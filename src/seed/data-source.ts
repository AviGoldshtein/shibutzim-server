import { DataSource } from "typeorm";
import { Unit } from "../shibutzim/entities/unit.entity";
import { Gdud } from "../shibutzim/entities/gdud.entity";
import { Shibutz } from "../shibutzim/entities/shibutz.entity";
import { Resource } from "../shibutzim/entities/resource.entity";
import { Item } from "../shibutzim/entities/item.entity";

import { ResourceType } from "../filters/entities/resource-type.entity";
import { ServiceType } from "../filters/entities/service-type.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "shibutzim_db",
  entities: [Unit, Gdud, Shibutz, Resource, Item, ResourceType, ServiceType, UnitNode],
  synchronize: false,
});