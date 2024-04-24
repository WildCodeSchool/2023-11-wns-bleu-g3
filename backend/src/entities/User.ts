import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRole {
  Admin = "admin",
  Visitor = "visitor",
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPassword = await hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  nickname: string;

  @Column()
  hashedPassword: string;

  @Column({
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
  })
  @Field()
  avatar: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.Visitor })
  role: UserRole;
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(2, 30)
  @Field()
  nickname: string;

  @Length(2, 300)
  @Field({ nullable: true })
  avatar?: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
@InputType()
export class UpdateUserInput {
  @Length(2, 30)
  @Field({ nullable: true })
  nickname?: string;

  @Length(2, 300)
  @Field({ nullable: true })
  avatar?: string;
}

export default User;
