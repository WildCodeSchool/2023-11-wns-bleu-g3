import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
@ObjectType()
class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => Post, (post) => post.reports, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.reports, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;
}

export default Report;
