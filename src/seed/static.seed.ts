import { DataSource } from "typeorm";
import { ResourceType } from "../filters/entities/resource-type.entity";
import { ServiceType } from "../filters/entities/service-type.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Location } from "../filters/entities/location.entity";
import { ItemType } from "../filters/entities/item-type.entity";

import resourceTypes from "./data/resource-types.json";
import itemTypes from "./data/item-types.json";
import serviceTypes from "./data/service-types.json";
import unitsTree from "./data/units-tree-data.json";
import locations from "./data/locations.json";

export async function seedStatic(dataSource: DataSource) {
  const resourceRepo = dataSource.getRepository(ResourceType);
  const itemRepo = dataSource.getRepository(ItemType);
  const serviceRepo = dataSource.getRepository(ServiceType);
  const locationRepo = dataSource.getRepository(Location);

  const unitRepo = dataSource.getTreeRepository(UnitNode);

  // Resource Types
  const resourceEntities = resourceTypes.map((name) =>
    resourceRepo.create({ name })
  );
  await resourceRepo.save(resourceEntities);

  // Item Types
  const itemEntities = itemTypes.map((name) =>
    itemRepo.create({ name })
  );
  await itemRepo.save(itemEntities);

  // Service Types
  const serviceEntities = serviceTypes.map((name) =>
    serviceRepo.create({ name })
  );
  await serviceRepo.save(serviceEntities);

  // Locations
  const locationEntities = locations.map((loc) =>
    locationRepo.create({
      name: loc.name,
      baseType: loc.baseType,
      region: loc.region,
    })
  );

  await locationRepo.save(locationEntities);

  // Units Tree (recursive)
  async function insertNode(
    node: any,
    parent: UnitNode | null = null
  ): Promise<UnitNode> {
    const entity = unitRepo.create({
      id: node.id,
      label: node.label,
      parent: parent ?? undefined,
    });

    const saved = await unitRepo.save(entity);

    if (node.children?.length) {
      for (const child of node.children) {
        await insertNode(child, saved);
      }
    }

    return saved;
  }

  for (const root of unitsTree) {
    await insertNode(root, null);
  }

  console.log("✅ Static data seeded");
}