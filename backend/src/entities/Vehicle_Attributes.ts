import { Field, InputType, ObjectType } from "type-graphql";
import { Column } from "typeorm";
import calculateDecade, {
  FuelType,
  VehicleType,
  VehicleDecade,
  MotoEngine,
} from "./Enums/Vehicle_Attributes";

@ObjectType()
export class Vehicle_Attr {
  @Column({
    type: "enum",
    enum: FuelType,
    nullable: true,
  })
  @Field(() => FuelType, { nullable: true })
  fuelType?: FuelType;

  @Column({
    type: "enum",
    enum: VehicleType,
    nullable: true,
  })
  @Field(() => VehicleType, { nullable: true })
  vehicleType?: VehicleType;

  @Column({
    type: "enum",
    enum: VehicleDecade,
    nullable: true,
  })
  @Field(() => VehicleDecade, { nullable: true })
  vehicleDecade?: VehicleDecade;

  @Column({
    type: "enum",
    enum: MotoEngine,
    nullable: true,
  })
  @Field(() => MotoEngine, { nullable: true })
  MotoEngine?: MotoEngine;
}

@InputType()
export class Vehicle_Attr_Input {
  @Field({ nullable: true })
  fuelType?: FuelType;

  @Field({ nullable: true })
  vehicleType?: VehicleType;

  @Field({ nullable: true })
  vehicleDecade?: VehicleDecade;

  @Field({ nullable: true })
  MotoEngine?: MotoEngine;
}

@InputType()
export class UpdateVehicle_Attr_Input {
  @Field({ nullable: true })
  fuelType?: FuelType;

  @Field({ nullable: true })
  vehicleType?: VehicleType;

  @Field({ nullable: true })
  vehicleDecade?: VehicleDecade;

  @Field({ nullable: true })
  MotoEngine?: MotoEngine;
}
