import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Shibutz } from "./shibutz.entity";
import { Item } from "./item.entity";
import { ResourceType } from "../../filters/entities/resource-type.entity";

@Entity({ schema: "core" })
export class Resource {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ResourceType, { eager: true })
  @JoinColumn({ name: "resourceTypeId" })
  resourceType: ResourceType;

  @Column()
  resourceTypeId: string;

  @ManyToOne(() => Shibutz, (shibutz) => shibutz.resources)
  shibutz: Shibutz;

  @OneToMany(() => Item, (item) => item.resource)
  items: Item[];
}