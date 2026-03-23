import { Unit } from "../shibutzim/entities/unit.entity";
import { Gdud } from "../shibutzim/entities/gdud.entity";
import { Shibutz } from "../shibutzim/entities/shibutz.entity";
import { Resource } from "../shibutzim/entities/resource.entity";
import { Item } from "../shibutzim/entities/item.entity";

import data from "./data/shibutzim-data.json";
import { DataSource } from "typeorm";

export async function seedCore(dataSource: DataSource) {
  const unitRepo = dataSource.getRepository(Unit);
  const gdudRepo = dataSource.getRepository(Gdud);
  const shibutzRepo = dataSource.getRepository(Shibutz);
  const resourceRepo = dataSource.getRepository(Resource);
  const itemRepo = dataSource.getRepository(Item);

  // UNIT
  const unit = unitRepo.create({
    name: data.unit,
  });

  await unitRepo.save(unit);

  // GDUDIM
  for (const gdudData of data.gdudim) {
    const gdud = gdudRepo.create({
      name: gdudData.name,
      forceType: gdudData.forceType,
      pikud: gdudData.pikud,
      unit,
    });

    await gdudRepo.save(gdud);

    // SHIBUTZIM
    for (const shibutzData of gdudData.shibutsim) {
      const shibutz = shibutzRepo.create({
        title: shibutzData.title,
        codeShibutz: shibutzData.codeShibuts,
        directCost: shibutzData.directCost,
        costOfItems: shibutzData.costOfItems,
        mesima: shibutzData.mesima,
        serviceType: shibutzData.serviceType,
        variationPastYear: shibutzData.variationPastYear,
        dateBegin: shibutzData.dateBegin,
        dateEnd: shibutzData.dateEnd,
        gdud,
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
  }
}