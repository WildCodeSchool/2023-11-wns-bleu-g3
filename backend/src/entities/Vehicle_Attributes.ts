import { Field, InputType } from "type-graphql";
import { Column } from "typeorm";
import calculateDecade, {
  FuelType,
  VehicleType,
  VehicleDecade,
  MotoEngine,
} from "./Enums/Vehicle_Attributes";

export class Vehicle_Attr {
  @Column({
    type: "enum",
    enum: FuelType,
  })
  @Field({ nullable: true })
  fuelType: FuelType;

  @Column({
    type: "enum",
    enum: VehicleType,
  })
  @Field({ nullable: true })
  vehicleType: VehicleType;

  @Column({
    type: "enum",
    enum: VehicleDecade,
  })
  @Field({ nullable: true })
  vehicleDecade: VehicleDecade;

  @Column({
    type: "enum",
    enum: MotoEngine,
  })
  @Field({ nullable: true })
  MotoEngine: MotoEngine;
}

@InputType()
export class Vehicle_Attr_Input {
  @Field({ nullable: true })
  fuelType: FuelType;

  @Field({ nullable: true })
  vehicleType: VehicleType;

  @Field({ nullable: true })
  vehicleDecade: VehicleDecade;

  @Field({ nullable: true })
  MotoEngine: MotoEngine;
}

@InputType()
export class UpdateVehicle_Attr_Input {
  @Field({ nullable: true })
  fuelType: FuelType;

  @Field({ nullable: true })
  vehicleType: VehicleType;

  @Field({ nullable: true })
  vehicleDecade: VehicleDecade;

  @Field({ nullable: true })
  MotoEngine: MotoEngine;
}
