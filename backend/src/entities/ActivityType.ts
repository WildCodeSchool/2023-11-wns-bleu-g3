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
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  UpdateVehicle_Attr_Input,
  Vehicle_Attr,
  Vehicle_Attr_Input,
} from "./Vehicle_Attributes";
import { Attr, Attr_Input, Update_Attr_Input } from "./Attributes";

export enum Unit {
  Weight = "grammes de CO2",
  PerUnit = "g CO2 par unité",
  Distance = "g CO2 par Km",
  Area = "g CO2 par m² par an",
  Energy = "g CO2 par kWh",
  Volume = "g CO2 par litre",
  Monetary = "g CO2 par € dépensé",
}

export enum Category {
  Car = "Voiture",
  Plane = "Avion",
  Bus = "Bus",
  Train = "Train",
  Moto = "Moto",
  Boat = "Bateau",
  Bike = "Vélo électrique",
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

  @Column(() => Attr)
  @Field(() => Attr, { nullable: true })
  attributes?: Attr;

  @Column(() => Vehicle_Attr)
  @Field(() => Vehicle_Attr, { nullable: true })
  vehicleAttributes?: Vehicle_Attr;
}

@InputType()
export class ActivityTypeInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Attr_Input, { nullable: true })
  attributes?: Attr_Input;

  @Field(() => Vehicle_Attr_Input, { nullable: true })
  vehicleAttributes?: Vehicle_Attr_Input;

  @Field()
  unit: string;

  @Field()
  @Min(0)
  emissions: number;
}

@InputType()
export class UpdateActivityTypeInput {
  @Field()
  category: string;

  @Field(() => Update_Attr_Input, { nullable: true })
  attributes?: Update_Attr_Input;

  @Field(() => UpdateVehicle_Attr_Input, { nullable: true })
  vehicleAttributes?: UpdateVehicle_Attr_Input;

  @Field()
  unit: string;

  @Field()
  @Min(0)
  emissions: number;
}

export default ActivityType;
