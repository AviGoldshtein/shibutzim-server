import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { ResourceType } from './entities/resource-type.entity';
import { ServiceType } from './entities/service-type.entity';
import { UnitNode } from './entities/unit-node.entity';
import { Location } from './entities/location.entity';
import { ItemType } from './entities/item-type.entity';
import { ForceType } from './entities/force-type.entity';

@Injectable()
export class FiltersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectRepository(ResourceType)
    private readonly resourceTypeRepository: Repository<ResourceType>,

    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,

    @InjectRepository(UnitNode)
    private readonly unitNodeRepository: Repository<UnitNode>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(ItemType)
    private readonly itemTypeRepository: Repository<ItemType>,

    @InjectRepository(ForceType)
    private readonly forceTypeRepository: Repository<ForceType>,
  ) {}



  private async getOrSet<T>(key: string, factory: () => Promise<T>): Promise<T> {
  
  try {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) {    
      return cached;
    }
  } catch (err) {
    console.error(`Cache error for key ${key}:`, err);
  }

  const result = await factory();

  try {
    await this.cacheManager.set(key, result);
  } catch (err) {
    console.error(`Failed to set cache for key ${key}:`, err);
  }

  return result;
}

  async getUnitsTree(idSoldier: string) {
    const rootId = 'givati'; // TODO: get root id by soldier id
    const cacheKey = `tree:${rootId}`;

    return this.getOrSet(cacheKey, async () => {
      const treeRepo =
        this.unitNodeRepository.manager.getTreeRepository(UnitNode);
      const root = await treeRepo.findOne({ where: { id: rootId } });
      if (!root) return null;

      return treeRepo.findDescendantsTree(root);
    });
  }

  async getServiceTypes() {
    const cacheKey = 'filters:service-types';
    return this.getOrSet(cacheKey, () => this.serviceTypeRepository.find());
  }

  async getResourceTypes() {
    const cacheKey = 'filters:resource-types';
    return this.getOrSet(cacheKey, () => this.resourceTypeRepository.find());
  }

  async getItemTypes() {
    const cacheKey = 'filters:item-types';
    return this.getOrSet(cacheKey, () => this.itemTypeRepository.find());
  }

  async getLocations() {
    const cacheKey = 'filters:locations';
    return this.getOrSet(cacheKey, () => this.locationRepository.find());
  }

  async getForces() {
    const cacheKey = 'filters:forces';
    return this.getOrSet(cacheKey, () => this.forceTypeRepository.find());
  }
}
