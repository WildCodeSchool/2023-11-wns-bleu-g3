import { Field, ObjectType, Int, InputType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import { ObjectId } from "../types";

@Entity()
@ObjectType()
class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  @Field()
  likes: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;
}

@InputType()
export class NewPostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => ObjectId)
  user: ObjectId;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  likes?: number;
}

export default Post;
