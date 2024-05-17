import { Field, InputType, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Attr {
  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  @Field({ nullable: true })
  madeInFrance?: boolean;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  @Field({ nullable: true })
  secondHandClothes?: boolean;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  @Field({ nullable: true })
  secondHandPhone?: boolean;
}

const madeInFranceCalc: { [key: string]: number } = {
  true: 0.5,
  false: 1.0,
};

const isSecondHandClothesCalc: { [key: string]: number } = {
  true: 0.18,
  false: 1.0,
};
const isSecondHandPhoneCalc: { [key: string]: number } = {
  true: 0.13,
  false: 1.0,
};

@InputType()
export class Attr_Input {
  @Field({ nullable: true })
  madeInFrance?: boolean;

  @Field({ nullable: true })
  secondHandClothes?: boolean;

  @Field({ nullable: true })
  secondHandPhone?: boolean;
}

@InputType()
export class Update_Attr_Input {
  @Field({ nullable: true })
  madeInFrance?: boolean;

  @Field({ nullable: true })
  secondHandClothes?: boolean;

  @Field({ nullable: true })
  secondHandPhone?: boolean;
}
