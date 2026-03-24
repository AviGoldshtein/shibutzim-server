import { Shibutz } from "../shibutzim/entities/shibutz.entity";
import { Resource } from "../shibutzim/entities/resource.entity";
import { Item } from "../shibutzim/entities/item.entity";
import { UnitNode } from "../filters/entities/unit-node.entity";

import data from "./data/shibutzim-data.json";
import { DataSource } from "typeorm";

export async function seedCore(dataSource: DataSource) {
  const unitRepo = dataSource.getRepository(UnitNode);
  const shibutzRepo = dataSource.getRepository(Shibutz);
  const resourceRepo = dataSource.getRepository(Resource);
  const itemRepo = dataSource.getRepository(Item);

  for (const shibutzData of data.shibutzim) {
    const unit = await unitRepo.findOneBy({ id: shibutzData.unitId });
    if (!unit) {
      console.warn(`⚠️ Unit with id ${shibutzData.unitId} not found. Skipping shibutz ${shibutzData.title}`);
      continue;
    }

    // SHIBUTZ
    const shibutz = shibutzRepo.create({
      title: shibutzData.title,
      codeShibutz: shibutzData.codeShibutz,
      directCost: shibutzData.directCost,
      costOfItems: shibutzData.costOfItems,
      mesima: shibutzData.mesima,
      serviceType: shibutzData.serviceType,
      variationPastYear: shibutzData.variationPastYear,
      dateBegin: shibutzData.dateBegin,
      dateEnd: shibutzData.dateEnd,
      unitNodeId: shibutzData.unitId,
    });

    await shibutzRepo.save(shibutz);

    // RESOURCES
    for (const resourceData of shibutzData.resources) {
      const resource = resourceRepo.create({
        categoryName: resourceData.categoryName,
        shibutz,
      });

      await resourceRepo.save(resource);

      // ITEMS
      const items = resourceData.items.map((itemData) =>
        itemRepo.create({
          name: itemData.name,
          quantity: itemData.quantity,
          unitCost: itemData.unitCost,
          resource,
        })
      );

      await itemRepo.save(items);
    }
  }

  console.log("✅ Core shibutzim seeded successfully");
}