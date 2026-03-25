import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ResourceType } from "./entities/resource-type.entity";
import { ServiceType } from "./entities/service-type.entity";
import { UnitNode } from "./entities/unit-node.entity";
import { Location } from "./entities/location.entity";

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(ResourceType)
    private readonly resourceTypeRepository: Repository<ResourceType>,

    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,

    @InjectRepository(UnitNode)
    private readonly unitNodeRepository: Repository<UnitNode>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getUnitsTree(idSoldier: string) {
    const rootId = 'givati' // TODO: get root id by soldier id
    const treeRepo = this.unitNodeRepository.manager.getTreeRepository(UnitNode);

    const root = await treeRepo.findOne({
      where: { id: rootId },
    });

    if (!root) return null;

    return treeRepo.findDescendantsTree(root);
  }

  async getServiceTypes() {
    return this.serviceTypeRepository.find();
  }

  async getResourceTypes() {
    return this.resourceTypeRepository.find();
  }

  async getLocations() {
    return this.locationRepository.find();
  }
}