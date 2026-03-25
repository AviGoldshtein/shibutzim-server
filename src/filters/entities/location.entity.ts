import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Shibutz } from "../../shibutzim/entities/shibutz.entity";

@Entity({ schema: "static" })
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  baseType?: string; // בסיס הדרכה / מבצעי / לוגיסטי וכו'

  @Column({ nullable: true })
  region?: string; // צפון / דרום / מרכז

  @OneToMany(() => Shibutz, (shibutz) => shibutz.location)
  shibutzim: Shibutz[];
}