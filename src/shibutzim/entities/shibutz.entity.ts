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
import { Location } from "../../filters/entities/location.entity";
import { ServiceType } from "../../filters/entities/service-type.entity";
import { ForceType } from "../../filters/entities/force-type.entity";

@Entity({ schema: "core" })
export class Shibutz {
  // Primary identifier
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Basic details
  @Column()
  title: string;

  @Column()
  codeShibutz: string;

  @Column()
  domain : string

  @Column()
  mesima: string;

  // Financial data
  @Column("decimal", { precision: 10, scale: 2 })
  directCost: number;

  @Column("decimal", { precision: 10, scale: 2 })
  costOfItems: number;

  @Column("decimal", { precision: 10, scale: 2 })
  variationPastYear: number;

  // Date range
  @Column({ type: "date" })
  dateBegin: string;

  @Column({ type: "date" })
  dateEnd: string;

  // Service relation
  @ManyToOne(() => ServiceType, { eager: false })
  @JoinColumn({ name: "serviceTypeId" })
  serviceType: ServiceType;

  @Index()
  @Column({ name: "serviceTypeId" })
  serviceTypeId: string;

  // Unit relation
  @ManyToOne(() => UnitNode, { eager: false })
  @JoinColumn({ name: "unitNodeId" })
  unitNode: UnitNode;

  @Index()
  @Column({ name: "unitNodeId" })
  unitNodeId: string;

  // Force relation
  @ManyToOne(() => ForceType, { eager: false })
  @JoinColumn({ name: "forceTypeId" })
  forceType: ForceType;

  @Index()
  @Column({ name: "forceTypeId" })
  forceTypeId: string;

  // Location relation
  @ManyToOne(() => Location, (location) => location.shibutzim, {
    eager: false,
  })
  @JoinColumn({ name: "locationId" })
  location: Location;

  @Index()
  @Column({ name: "locationId" })
  locationId: string;

  // Resources relation
  @OneToMany(() => Resource, (resource) => resource.shibutz)
  resources: Resource[];
}