import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface PostCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Важное объявление', description: 'Заголовок Поста'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: 'Жили были...', description: 'Содержание Поста'})
  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @ApiProperty({description: 'Изображение Поста'})
  @Column({type: DataType.STRING})
  image: string;

  @ApiProperty({type: Number, description: 'ID пользователя, которому принадлежит Пост'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @ApiProperty({type: () => User, description: 'Какому пользователю принадлежит Пост'})
  @BelongsTo(() => User)
  author: User
}
