import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Resource } from "./resource.entity";

@Entity({ schema: "core" })
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column("numeric", { precision: 10, scale: 2 })
  unitCost: number;

  @ManyToOne(() => Resource, (resource) => resource.items)
  resource: Resource;
}