import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Cron } from '@nestjs/schedule';
import {
  Repository,
  TreeRepository,
  DataSource,
  SelectQueryBuilder,
} from 'typeorm';
import { UnitNode } from '../filters/entities/unit-node.entity';
import { Shibutz } from './entities/shibutz.entity';
import { GetShibutzimDto } from './dto/get-shibutzim.dto';

@Injectable()
export class ShibutzimService {
  private unitTreeRepo: TreeRepository<UnitNode>;

  constructor(
    @InjectRepository(Shibutz)
    private readonly shibutzRepo: Repository<Shibutz>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.unitTreeRepo = this.dataSource.getTreeRepository(UnitNode);
  }

  @Cron('0 8 * * *')
  async handleDailyReset() {
    try {
      await this.cacheManager.clear();
    } catch (err) {
      console.error('Error during cache clear:', err);
    }
  }

  private async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
  ): Promise<T> {
    try {
      const cached = await this.cacheManager.get<T>(key);
      if (cached) return cached;
    } catch (err) {
      console.error(`Cache error: ${err}`);
    }

    const result = await factory();

    try {
      await this.cacheManager.set(key, result);
    } catch (err) {
      console.error(`Cache set error: ${err}`);
    }

    return result;
  }

  async getShibutzim(query: GetShibutzimDto) {
    const cacheKey = `shibutzim:${JSON.stringify(query)}`;

    return this.getOrSet(cacheKey, async () => {
      const unitsWithDescendants = await this.getUnitsWithDescendants(
        query.unitIds || [],
      );

      if (!unitsWithDescendants.length) {
        return {
          period: { start: query.from, end: query.to },
          shibutzim: [],
        };
      }

      const shibutzim = await this.fetchShibutzimFromDb(
        unitsWithDescendants,
        query,
      );

      const normalized = this.normalizeShibutzim(shibutzim);

      return {
        period: {
          start: query.from,
          end: query.to,
        },
        shibutzim: normalized,
      };
    });
  }

  private async getUnitsWithDescendants(unitIds: string[]): Promise<string[]> {
    const allIds = new Set<string>();
    for (const id of unitIds) {
      const node = await this.unitTreeRepo.findOne({ where: { id } });
      if (node) {
        const descendants = await this.unitTreeRepo.findDescendants(node);
        descendants.forEach((d) => allIds.add(d.id));
      }
    }
    return Array.from(allIds);
  }

  private async fetchShibutzimFromDb(
    unitIds: string[],
    query: GetShibutzimDto,
  ): Promise<Shibutz[]> {
    const { from, to, serviceTypes, resourceTypes, locationIds } = query;

    const qb = this.shibutzRepo
      .createQueryBuilder('shibutz')
      .leftJoinAndSelect('shibutz.location', 'location')
      .leftJoinAndSelect('shibutz.serviceType', 'serviceType')
      .leftJoinAndSelect('shibutz.forceType', 'forceType')
      .leftJoinAndSelect('shibutz.unitNode', 'unitNode')
      .leftJoinAndSelect('shibutz.resources', 'resource')
      .leftJoinAndSelect('resource.resourceType', 'resourceType')
      .leftJoinAndSelect('resource.items', 'item')
      .leftJoinAndSelect('item.itemType', 'itemType')
      .where('shibutz.unitNodeId IN (:...unitIds)', { unitIds })
      .andWhere('shibutz.dateBegin >= :from', { from })
      .andWhere('shibutz.dateEnd <= :to', { to });

    if (serviceTypes?.length) {
      qb.andWhere('shibutz.serviceTypeId IN (:...st)', { st: serviceTypes });
    }

    if (locationIds?.length) {
      qb.andWhere('shibutz.locationId IN (:...locIds)', { locIds: locationIds });
    }

    if (resourceTypes?.length) {
      qb.andWhere(
        `EXISTS (
          SELECT 1 FROM core.resource r 
          WHERE r."shibutzId" = shibutz.id 
          AND r."resourceTypeId" IN (:...resTypes)
        )`,
        { resTypes: resourceTypes },
      );
    }

    return qb.getMany();
  }

  private normalizeShibutzim(shibutzim: Shibutz[]) {
    return shibutzim.map((s) => ({
      title: s.title,
      codeShibutz: s.codeShibutz,
      mesima: s.mesima,
      dateBegin: s.dateBegin,
      dateEnd: s.dateEnd,
      directCost: Number(s.directCost || 0),
      costOfItems: Number(s.costOfItems || 0),
      variationPastYear: Number(s.variationPastYear || 0),
      location: s.location?.name ?? null,
      serviceType: s.serviceType?.name ?? null,
      forceType: s.forceType?.name ?? null,
      unitId: s.unitNode?.label ?? null,
      resources: (s.resources || []).map((r) => ({
        categoryName: r.resourceType?.name ?? null,
        items: (r.items || []).map((i) => ({
          name: i.itemType?.name ?? null,
          quantity: i.quantity,
          unitCost: Number(i.unitCost || 0),
        })),
      })),
    }));
  }
}