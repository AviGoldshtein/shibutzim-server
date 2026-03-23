import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity({ schema: "static" })
export class UnitNode {
  // משתמשים ב-id מה-JSON שלך (לא auto)
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  // parent
  @ManyToOne(() => UnitNode, (node) => node.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent: UnitNode | null;

  // children
  @OneToMany(() => UnitNode, (node) => node.parent)
  children: UnitNode[];
}