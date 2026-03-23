import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Gdud } from "./gdud.entity";

@Entity({ schema: "core" })
export class Unit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Gdud, (gdud) => gdud.unit)
  gdudim: Gdud[];
}