import { Field, ObjectType, Int, InputType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Like from "./Like";
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

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @Field({ nullable: true })
  nbOfLikes?: number;

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like])
  likes: Like[];

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
}

export default Post;