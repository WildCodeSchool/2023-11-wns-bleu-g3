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
class Donation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  amount: number;

  @CreateDateColumn()
  @Field()
  dateOfDonation: Date;

  @ManyToOne(() => User, (user) => user.donation, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;
}

@InputType()
export class NewDonationInput {
  @Field()
  amount: number;

  // @Field(() => ObjectId)
  // user: ObjectId;
}

export default Donation;
