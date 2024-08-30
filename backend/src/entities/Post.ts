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
import Report from "./Report";
import { ObjectId } from "../types";
import { Length } from "class-validator";

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

  @OneToMany(() => Report, (reports) => reports.post)
  @Field(() => [Report])
  reports: Report[];

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;
}

@InputType()
export class NewPostInput {
  @Length(2, 100)
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
  @Length(2, 100)
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  imageUrl?: string;
}

export default Post;
