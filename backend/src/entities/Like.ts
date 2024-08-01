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
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @Field(() => Post)
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(() => User)
  user: User;
}

export default Like;
