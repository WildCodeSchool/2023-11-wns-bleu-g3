import { Min, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Unit {
  Weight = "g/CO²",
  Distance = "g/CO² par Km",
  Area = "g/CO² par m²",
  Monetary = "€ dépensé",
}

export enum Category {
  Vehicles = "Voiture",
  Plane = "Avion",
  Bus = "Bus",
  Train = "Tram",
  Moto = "Moto",
  Boat = "Bateau",
  Heating = "Chauffage",
  Clothing = "Vêtements",
  Electronics = "Électronique",
  Others = "Autre",
}

@Entity()
@ObjectType()
class ActivityType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    enum: Category,
  })
  category: Category;

  @Field()
  @Column({
    enum: Unit,
  })
  unit: Unit;

  @Field()
  @Column()
  @Min(0)
  emissions: number;
}

// @InputType()
// export class ActivityTypeInput {
//   @Field()
//   name: string;

//   @Field()
//   category: string;

//   @Field()
//   unit: string;

//   @Field()
//   emissions: number;
// }

export default ActivityType;
