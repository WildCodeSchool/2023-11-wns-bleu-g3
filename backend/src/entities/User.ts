import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRole {
  Admin = "admin",
  User = "user",
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Column()
  hashedPassword: string;

  @Column({
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
  })
  @Field({ nullable: true })
  avatarUrl: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Column({ nullable: true, type: "varchar", unique: true })
  emailConfirmationToken?: string | null;

  @Column({ nullable: true, type: "varchar", unique: true })
  resetPasswordToken?: string | null;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: string;
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(2, 30)
  @Field()
  nickname: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  emailOrNickname: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class ResetPasswordRequestInput {
  @Field()
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Length(2, 30)
  @Field({ nullable: true })
  nickname?: string;

  @Length(2, 30)
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}

export default User;
