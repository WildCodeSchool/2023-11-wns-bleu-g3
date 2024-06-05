import { Min } from "class-validator";
import {
  Field,
  InputType,
  ObjectType,
  Int,
  registerEnumType,
} from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import ActivityType from "./ActivityType";

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
  })
  @Field({ nullable: true })
  reccurence_interval: ReccurenceInterval;

  @Column({ type: "int" })
  @Field({ nullable: true })
  @Min(0)
  reccurence_count: number;

  @Column({ type: "date" })
  @Field()
  starts_at: Date;

  @Column({ type: "date", nullable: true })
  @Field()
  ends_at: Date;

  @ManyToOne(() => User, (user) => user.activities, {
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

  @ManyToOne(() => ActivityType, (activityType) => activityType.activities)
  @Field(() => ActivityType)
  activityType: ActivityType;
}

export default Activity;
