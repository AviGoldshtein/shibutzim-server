import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { UnitNode } from "../../filters/entities/unit-node.entity";
import { Resource } from "./resource.entity";

@Entity({ schema: "core" })
export class Shibutz {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  codeShibutz: string;

  @Column("numeric", { precision: 10, scale: 2 })
  directCost: number;

  @Column("numeric", { precision: 10, scale: 2 })
  costOfItems: number;

  @Column()
  mesima: string;

  @Column()
  serviceType: string;

  @Column()
  variationPastYear: number;

  @Column({ type: "date" })
  dateBegin: string;

  @Column({ type: "date" })
  dateEnd: string;

  @ManyToOne(() => UnitNode, { eager: false })
  @JoinColumn({ name: "unitNodeId" })
  unitNode: UnitNode;

  @Index()
  @Column({ name: "unitNodeId" })
  unitNodeId: string;

  @OneToMany(() => Resource, (resource) => resource.shibutz)
  resources: Resource[];
}