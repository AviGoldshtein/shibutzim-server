import {
  Column,
  Entity,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ schema: 'static' })
@Tree('closure-table')
export class UnitNode {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @TreeChildren()
  children: UnitNode[];

  @TreeParent()
  parent: UnitNode;
}
