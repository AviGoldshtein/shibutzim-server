import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Resource } from "./resource.entity";
import { ItemType } from "../../filters/entities/item-type.entity";

@Entity({ schema: "core" })
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ItemType, { eager: true })
  @JoinColumn({ name: "itemTypeId" })
  itemType: ItemType;

  @Column()
  itemTypeId: string;

  @Column()
  quantity: number;

  @Column("numeric", { precision: 10, scale: 2 })
  unitCost: number;

  @ManyToOne(() => Resource, (resource) => resource.items)
  resource: Resource;
}