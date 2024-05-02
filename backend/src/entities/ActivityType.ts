import { Min, Length } from "class-validator";
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import calculateDecade, {
  FuelType,
  VehicleType,
  VehicleDecade,
  MotoEngine,
} from "./Enums/Vehicle_Attributes";

export enum Unit {
  Weight = "grammes de CO2",
  PerUnit = "g CO2 par unité",
  Distance = "g CO2 par Km",
  Area = "g CO2 par m²",
  Energy = "g CO2 par kWh",
  Volume = "g CO2 par litre",
  Monetary = "g CO2 par € dépensé",
}

export enum Category {
  Car = "Voiture",
  Plane = "Avion",
  Bus = "Bus",
  Metro = "Metro Tram",
  Train = "TGV",
  Moto = "Moto",
  Boat = "Bateau",
  Heating = "Chauffage",
  Cooling = "Climatisation",
  Lighting = "Éclairage",
  Appliances = "Appareils ménagers",
  Water = "Eau",
  Food = "Alimentation",
  Waste = "Déchets",
  Clothing = "Vêtements",
  Electronics = "Électronique",
  Services = "Services",
  Leisure = "Loisirs",
  Renewables = "Énergies renouvelables",
  Others = "Autres",
}

registerEnumType(Unit, {
  name: "Unit",
});
registerEnumType(Category, {
  name: "Category",
});

@Entity()
@ObjectType()
class ActivityType extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  @Field()
  name: string;

  @Column({
    type: "enum",
    enum: Category,
  })
  @Field()
  category: Category;

  @Column({
    type: "enum",
    enum: FuelType,
  })
  @Field()
  fuelType: FuelType;

  @Column({
    type: "enum",
    enum: VehicleType,
  })
  @Field()
  vehicleType: VehicleType;

  @Column({
    type: "enum",
    enum: VehicleDecade,
  })
  @Field()
  vehicleDecade: VehicleDecade;

  @Column({
    type: "enum",
    enum: MotoEngine,
  })
  @Field()
  MotoEngine: MotoEngine;

  @Column({
    type: "enum",
    enum: Unit,
  })
  @Field()
  unit: Unit;

  @Column({ type: "int" })
  @Field()
  @Min(0)
  emissions: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class ActivityTypeInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  unit: string;

  @Field()
  @Min(0)
  emissions: number;
}

@InputType()
export class UpdateActivityTypeInput {
  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  unit?: string;

  @Field({ nullable: true })
  @Min(0)
  emissions?: number;
}

export default ActivityType;
