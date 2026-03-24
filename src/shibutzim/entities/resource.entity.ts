import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Shibutz } from "./shibutz.entity";
import { Item } from "./item.entity";

@Entity({ schema: "core" })
export class Resource {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  categoryName: string;

  @ManyToOne(() => Shibutz, (shibutz) => shibutz.resources)
  shibutz: Shibutz;

  @OneToMany(() => Item, (item) => item.resource)
  items: Item[];
}