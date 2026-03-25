import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "static" })
export class ItemType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;
}