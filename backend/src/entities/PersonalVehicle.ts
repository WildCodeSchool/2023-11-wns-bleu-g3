import { Length, Max, Min } from "class-validator";
import {
  Field,
  ObjectType,
  Int,
  InputType,
} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import { VehicleCategory, FuelType,  VehicleType, MotoEngine } from "./Enums/Vehicle_Attributes";
import { ObjectId } from "../types";

@Entity()
@ObjectType()
class PersonalVehicle extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @Field()
  name: string;

  @Column({
    type: "enum",
    enum: VehicleCategory,
  })
  @Field()
  vehicle_category: VehicleCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.activities, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => User)
  user: User;

  // Car
  @Column({ nullable: true })
  @Field({ nullable: true })
  @Min(1950)
  @Max(2024)
  year_of_construction?: number;

  @Column({
    type: "enum",
    enum: VehicleType,
    nullable: true
  })
  @Field({ nullable: true })
  vehicle_type?: VehicleType;

  @Column({
    type: "enum",
    enum: FuelType,
    nullable: true
  })
  @Field({ nullable: true })
  fuel_type?: FuelType;

  // Moto Scooter
  @Column({
    type: "enum",
    enum: MotoEngine,
    nullable: true
  })
  @Field({ nullable: true })
  moto_engine?: MotoEngine;
}

@InputType()
export class NewPersonalVehicleInput {
  @Length(2, 50)
  @Field()
  name: string;

  @Field()
  vehicle_category: VehicleCategory;

  @Field({ nullable: true })
  @Min(1950)
  @Max(2024)
  year_of_construction?: number;

  @Field({ nullable: true })
  vehicle_type?: VehicleType;

  @Field({ nullable: true })
  fuel_type?: FuelType;

  @Field({ nullable: true })
  moto_engine?: MotoEngine;

  @Field(() => ObjectId)
  user: ObjectId;
}

@InputType()
export class UpdatePersonalVehicleInput {
  @Length(2, 50)
  @Field()
  name: string;

  @Field()
  vehicle_category: VehicleCategory;

  @Field({ nullable: true })
  @Min(1950)
  @Max(2024)
  year_of_construction?: number;

  @Field({ nullable: true })
  vehicle_type?: VehicleType;

  @Field({ nullable: true })
  fuel_type?: FuelType;

  @Field({ nullable: true })
  moto_engine?: MotoEngine;

  @Field(() => ObjectId)
  user: ObjectId;
}

export default PersonalVehicle;
