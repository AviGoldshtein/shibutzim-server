import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Gdud } from "./gdud.entity";
import { Resource } from "./resource.entity";

@Entity({ schema: "core" })
export class Shibutz {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  codeShibutz: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  directCost: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costOfItems: number;

  @Column()
  mesima: string;

  @Column()
  serviceType: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  variationPastYear: number;

  @Column({ type: "date" })
  dateBegin: string;

  @Column({ type: "date" })
  dateEnd: string;

  @ManyToOne(() => Gdud, (gdud) => gdud.shibutzim)
  gdud: Gdud;

  @OneToMany(() => Resource, (resource) => resource.shibutz)
  resources: Resource[];
}