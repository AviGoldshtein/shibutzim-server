import { Shibutz } from "../shibutzim/entities/shibutz.entity";
import { Resource } from "../shibutzim/entities/resource.entity";
import { Item } from "../shibutzim/entities/item.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";
import { Location } from "../filters/entities/location.entity";
import { ResourceType } from "../filters/entities/resource-type.entity";
import { ServiceType } from "../filters/entities/service-type.entity";
import { ItemType } from "../filters/entities/item-type.entity";
import { ForceType } from "../filters/entities/force-type.entity";

import data from "./data/shibutzim-data.json";
import { DataSource } from "typeorm";

export async function seedCore(dataSource: DataSource) {
  const unitRepo = dataSource.getRepository(UnitNode);
  const locationRepo = dataSource.getRepository(Location);
  const shibutzRepo = dataSource.getRepository(Shibutz);
  const resourceRepo = dataSource.getRepository(Resource);
  const resourceTypeRepo = dataSource.getRepository(ResourceType);
  const serviceTypeRepo = dataSource.getRepository(ServiceType);
  const itemTypeRepo = dataSource.getRepository(ItemType);
  const itemRepo = dataSource.getRepository(Item);
  const forceRepo = dataSource.getRepository(ForceType);

  // 🧠 טוענים הכל מראש (פעם אחת בלבד)
  const [units, locations, resourceTypes, serviceTypes, itemTypes, forceTypes] = await Promise.all([
    unitRepo.find(),
    locationRepo.find(),
    resourceTypeRepo.find(),
    serviceTypeRepo.find(),
    itemTypeRepo.find(),
    forceRepo.find()
  ]);

  // 🗺️ maps
  const unitMap = new Map(units.map((u) => [u.id, u]));
  const locationMap = new Map(locations.map((l) => [l.name, l.id]));
  const resourceTypeMap = new Map(resourceTypes.map(r => [r.name, r.id]));
  const serviceTypeMap = new Map(serviceTypes.map(s => [s.name, s.id]));
  const itemTypeMap = new Map(itemTypes.map(i => [i.name, i.id]));
  const forceTypeMap = new Map(forceTypes.map(f => [f.name, f.id]));

  for (const shibutzData of data.shibutzim) {
    const unit = unitMap.get(shibutzData.unitId);
    if (!unit) {
      console.warn(
        `⚠️ Unit with id ${shibutzData.unitId} not found. Skipping ${shibutzData.title}`
      );
      continue;
    }

    const locationId = locationMap.get(shibutzData.location!);
    if (!locationId) {
      console.warn(
        `⚠️ Location "${shibutzData.location}" not found. Skipping ${shibutzData.title}`
      );
      continue;
    }

    const serviceTypeId = serviceTypeMap.get(shibutzData.serviceType);
    if (!serviceTypeId) {
      console.warn(
        `⚠️ ServiceType "${shibutzData.serviceType}" not found. Skipping ${shibutzData.title}`
      );
      continue;
    }

    const forceTypeId = forceTypeMap.get(shibutzData.forceType);
    if (!forceTypeId) {
      console.warn(
        `⚠️ ForceType "${shibutzData.forceType}" not found. Skipping ${shibutzData.title}`
      );
      continue;
    }

    // 🧱 SHIBUTZ
    const shibutz = shibutzRepo.create({
      title: shibutzData.title,
      codeShibutz: shibutzData.codeShibutz,
      domain: shibutzData.domain,
      directCost: shibutzData.directCost,
      costOfItems: shibutzData.costOfItems,
      mesima: shibutzData.mesima,
      variationPastYear: shibutzData.variationPastYear,
      dateBegin: shibutzData.dateBegin,
      dateEnd: shibutzData.dateEnd,
      unitNodeId: unit.id,
      locationId,
      serviceTypeId,
      forceTypeId,
    });

    await shibutzRepo.save(shibutz);

    // 📦 RESOURCES
    for (const resourceData of shibutzData.resources) {
      const resourceTypeId = resourceTypeMap.get(resourceData.categoryName);

      if (!resourceTypeId) {
        console.warn(
          `⚠️ ResourceType "${resourceData.categoryName}" not found. Skipping resource in ${shibutzData.title}`
        );
        continue;
      }

      const resource = resourceRepo.create({
        resourceTypeId,
        shibutz,
      });

      await resourceRepo.save(resource);

      // 📦 ITEMS
      for (const itemData of resourceData.items) {
        const itemTypeId = itemTypeMap.get(itemData.name);
        if (!itemTypeId) {
          console.warn(
            `⚠️ ItemType "${itemData.name}" not found. Skipping item in resource of ${shibutzData.title}`
          );
          continue;
        }

        const item = itemRepo.create({
          quantity: itemData.quantity,
          unitCost: itemData.unitCost,
          resource,
          itemTypeId
        })

        await itemRepo.save(item)
      }
    }
  }

  console.log("✅ Core shibutzim seeded successfully");
} 