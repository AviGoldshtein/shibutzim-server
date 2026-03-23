import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "static" })
export class ServiceType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;
}