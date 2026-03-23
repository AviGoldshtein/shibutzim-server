import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "static" })
export class ResourceType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;
}