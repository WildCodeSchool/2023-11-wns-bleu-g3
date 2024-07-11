import { Min } from "class-validator";
import {
  Field,
  InputType,
  ObjectType,
  Int,
} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import ActivityType from "./ActivityType";
import { ObjectId } from "../types";

export enum ReccurenceInterval {
  Day = "jour",
  Week = "semaine",
  Month = "mois",
  Trimester = "trimestre",
  Year = "an",
}

@Entity()
@ObjectType()
class Activity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Field()
  name: string;

  @Column()
  @Field()
  quantity: number;

  @Column({ default: false })
  @Field()
  is_reccurent: boolean;

  @Column({
    type: "enum",
    enum: ReccurenceInterval,
    nullable: true
  })
  @Field({ nullable: true })
  reccurence_interval?: ReccurenceInterval;

  @Column({ type: "int", nullable: true })
  @Field({ nullable: true })
  @Min(0)
  reccurence_count?: number;

  @Column({ type: "timestamp" })
  @Field()
  starts_at: Date;

  @Column({ type: "timestamp", nullable: true })
  @Field({ nullable: true })
  ends_at?: Date;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;

  @Column({ default: false })
  @Field()
  is_secondhand: boolean;

  @Column({ default: false })
  @Field()
  is_made_in_france: boolean;

  @ManyToOne(() => ActivityType, (activityType) => activityType.id)
  @Field(() => ActivityType)
  activityType: ActivityType;
}

@InputType()
export class NewActivityInput {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  is_reccurent: boolean;

  @Field({ nullable: true })
  reccurence_interval?: ReccurenceInterval;

  @Field({ nullable: true })
  @Min(0)
  reccurence_count?: number;

  @Field()
  starts_at: Date;

  @Field({ nullable: true })
  ends_at?: Date;

  @Field()
  is_secondhand: boolean;

  @Field()
  is_made_in_france: boolean;

  @Field(() => ObjectId)
  activityType: ObjectId;
}

@InputType()
export class UpdateActivityInput {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  is_reccurent: boolean;

  @Field({ nullable: true })
  reccurence_interval?: ReccurenceInterval;

  @Field({ nullable: true })
  @Min(0)
  reccurence_count?: number;

  @Field()
  starts_at: Date;

  @Field({ nullable: true })
  ends_at?: Date;

  @Field()
  is_secondhand: boolean;

  @Field()
  is_made_in_france: boolean;

  @Field(() => ObjectId)
  activityType: ObjectId;
}

export default Activity;
