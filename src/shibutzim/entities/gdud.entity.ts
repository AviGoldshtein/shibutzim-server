import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Unit } from "./unit.entity";
import { Shibutz } from "./shibutz.entity";

@Entity({ schema: "core" })
export class Gdud {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  forceType: string;

  @Column()
  pikud: string;

  @ManyToOne(() => Unit, (unit) => unit.gdudim)
  unit: Unit;

  @OneToMany(() => Shibutz, (shibutz) => shibutz.gdud)
  shibutzim: Shibutz[];
}