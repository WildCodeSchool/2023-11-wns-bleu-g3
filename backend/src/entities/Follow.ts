import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity()
@ObjectType()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.following)
  @Field(() => User)
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  @Field(() => User)
  following: User;
}