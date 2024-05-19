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
  })
  @Field()
  madeInFrance: MadeInFrance;

  @Column({
    type: "enum",
    enum: SecondHandClothes,
  })
  @Field()
  secondHandClothes: SecondHandClothes;

  @Column({
    type: "enum",
    enum: SecondHandPhones,
  })
  @Field()
  secondHandPhones: SecondHandPhones;
}

@InputType()
export class Attr_Input {
  @Field()
  madeInFrance?: boolean;

  @Field()
  secondHandClothes?: boolean;

  @Field()
  secondHandPhones?: boolean;
}

@InputType()
export class Update_Attr_Input {
  @Field()
  madeInFrance?: boolean;

  @Field()
  secondHandClothes?: boolean;

  @Field()
  secondHandPhones?: boolean;
}
