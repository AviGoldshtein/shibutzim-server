import { DataSource } from "typeorm";
import { ResourceType } from "../filters/entities/resource-type.entity";
import { ServiceType } from "../filters/entities/service-type.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";

import resourceTypes from "./data/resource-types.json";
import serviceTypes from "./data/service-types.json";
import unitsTree from "./data/units-tree-data.json";

export async function seedStatic(dataSource: DataSource) {
  const resourceRepo = dataSource.getRepository(ResourceType);
  const serviceRepo = dataSource.getRepository(ServiceType);

  const unitRepo = dataSource.getTreeRepository(UnitNode);

  // Resource Types
  const resourceEntities = resourceTypes.map((name) =>
    resourceRepo.create({ name })
  );
  await resourceRepo.save(resourceEntities);

  // Service Types
  const serviceEntities = serviceTypes.map((name) =>
    serviceRepo.create({ name })
  );
  await serviceRepo.save(serviceEntities);

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