import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Note extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: number;

  @Column
  title: string;

  @Column
  body: string;

  @Column
  category: string;

  @Default(new Date())
  @Column
  createdDate: Date;

  @Column
  archived: boolean;
}
