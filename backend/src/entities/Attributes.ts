import {
  Field,
  InputType,
  ObjectType,
  Int,
  registerEnumType,
} from "type-graphql";
import { Column } from "typeorm";

export enum MadeInFrance {
  False = 1.0,
  True = 0.5,
}

export enum SecondHandClothes {
  False = 1.0,
  True = 0.5,
}
export enum SecondHandPhones {
  False = 1.0,
  True = 0.5,
}

registerEnumType(MadeInFrance, {
  name: "MadeInFrance",
});

registerEnumType(SecondHandClothes, {
  name: "SecondHandClothes",
});

registerEnumType(SecondHandPhones, {
  name: "SecondHandPhones",
});

@ObjectType()
export class Attr {
  @Column({
    type: "enum",
    enum: MadeInFrance,
    nullable: true,
    default: MadeInFrance.False,
  })
  @Field({ nullable: true })
  madeInFrance: MadeInFrance;

  @Column({
    type: "enum",
    enum: SecondHandClothes,
    nullable: true,
    default: SecondHandClothes.False,
  })
  @Field({ nullable: true })
  secondHandClothes: SecondHandClothes;

  @Column({
    type: "enum",
    enum: SecondHandPhones,
    nullable: true,
    default: SecondHandPhones.False,
  })
  @Field({ nullable: true })
  secondHandPhones: SecondHandPhones;
}

@InputType()
export class Attr_Input {
  @Field({ nullable: true })
  madeInFrance?: boolean;

  @Field({ nullable: true })
  secondHandClothes?: boolean;

  @Field({ nullable: true })
  secondHandPhones?: boolean;
}

@InputType()
export class Update_Attr_Input {
  @Field({ nullable: true })
  madeInFrance?: boolean;

  @Field({ nullable: true })
  secondHandClothes?: boolean;

  @Field({ nullable: true })
  secondHandPhones?: boolean;
}
