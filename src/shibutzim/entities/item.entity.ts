import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemType } from '../../filters/entities/item-type.entity';
import { Resource } from './resource.entity';

@Entity({ schema: 'core' })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ItemType, { eager: true })
  @JoinColumn({ name: 'itemTypeId' })
  itemType: ItemType;

  @Column()
  itemTypeId: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitCost: number;

  @ManyToOne(() => Resource, (resource) => resource.items)
  resource: Resource;
}
