import {
  Arg,
  Mutation,
  Query,
  Ctx,
  Int,
  Resolver,
  Authorized,
} from "type-graphql";
import User, {
  LoginInput,
  NewUserInput,
  ResetPasswordInput,
  ResetPasswordRequestInput,
  UpdateUserInput,
} from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../types";
import crypto from "crypto";
import mailer from "../mailer";
import { hash } from "argon2";
import { UserRole } from "../entities/User";
import { Brackets, IsNull } from "typeorm";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingEmail = await User.findOneBy({ email: data.email });
    if (existingEmail !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const existingNickname = await User.findOneBy({ nickname: data.nickname });
    if (existingNickname !== null)
      throw new GraphQLError("NICKNAME_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const token = crypto.randomBytes(20).toString("hex");
    newUser.emailConfirmationToken = token;

    await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: newUser.email,
      subject: "Bienvenue sur GreenFoot !",
      text: `Bienvenue sur GreenFoot ${newUser.nickname} ! Pour confirmer votre email, cliquez sur ce lien: ${env.FRONTEND_URL}?emailToken=${token}`,
    });

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Mutation(() => Boolean)
  async confirmEmail(@Arg("emailToken") token: string) {
    const user = await User.findOneBy({ emailConfirmationToken: token });
    if (!user) throw new GraphQLError("Invalid Token");

    user.emailVerified = true;
    user.emailConfirmationToken = null;
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async resetPasswordRequest(@Arg("data") data: ResetPasswordRequestInput) {
    const user = await User.findOneBy({ email: data.email });
    if (!user) throw new GraphQLError("Invalid email address");
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.save();

    await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: user.email,
      subject: "Mot de passe oublié",
      text: `Pour réinitialiser votre mot de passe, merci de cliquer sur le lien suivant : ${env.FRONTEND_URL}?resetPasswordToken=${user.resetPasswordToken}`,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("data", { validate: true }) data: ResetPasswordInput,
    @Arg("resetPasswordToken") token: string
  ) {
    const user = await User.findOneBy({ resetPasswordToken: token });
    if (!user) throw new GraphQLError("Invalid Token");
    user.hashedPassword = await hash(data.password);
    user.resetPasswordToken = null;
    return user.save().then(() => true);
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    return User.findOneOrFail({
      relations: { personalVehicles: true, followers: true, following: true },
      where: { id: ctx.currentUser.id },
    });
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    let findUser = await User.findOneBy({ email: data.emailOrNickname });
    if (findUser === null) {
      findUser = await User.findOneBy({ nickname: data.emailOrNickname });
      if (findUser === null) throw new GraphQLError("Invalid Credentials");
    }
    const passwordVerified = await verify(
      findUser.hashedPassword,
      data.password
    );
    if (!passwordVerified) throw new GraphQLError("Invalid Credentials");

    if (findUser.isBlocked === true)
      throw new GraphQLError("This account has been suspended.");

    if (findUser.emailVerified === false)
      throw new GraphQLError(
        "You need to verify your email address by clicking on the link sent before you can log in to your account."
      );

    const token = jwt.sign(
      {
        userId: findUser.id,
        role: findUser.role,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "development",
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie("token");
    return "ok";
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: UpdateUserInput
  ) {
    if (!ctx.currentUser)
      throw new GraphQLError("You need to be logged in to update your profile");

    if (data.firstName || data.firstName === "")
      ctx.currentUser.firstName = data.firstName;
    if (data.lastName || data.lastName === "")
      ctx.currentUser.lastName = data.lastName;
    if (data.avatarUrl || data.avatarUrl === "")
      ctx.currentUser.avatarUrl = data.avatarUrl;
    if (data.nickname || data.nickname === "")
      ctx.currentUser.nickname = data.nickname;
    if (data.email || data.email === "") ctx.currentUser.email = data.email;

    return ctx.currentUser.save();
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUser(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) id?: number
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You must be authenticated");

    if (!id) {
      const userToDelete = await User.findOneBy({ id: ctx.currentUser.id });
      if (!userToDelete) throw new GraphQLError("User not found");

      await userToDelete.remove();
      ctx.res.clearCookie("token");
      return "User deleted and logged out successfully";
    }

    const userToDelete = await User.findOneBy({ id });
    if (!userToDelete) throw new GraphQLError("User not found");

    await userToDelete.remove();
    return "This user has been deleted";
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => [String])
  async toggleBlockUser(
    @Ctx() ctx: Context,
    @Arg("userIds", () => [Int]) ids: number[]
  ): Promise<string[]> {
    if (!ctx.currentUser) throw new GraphQLError("You must be authenticated");

    if (ctx.currentUser.role !== "admin") {
      throw new GraphQLError("You do not have permission to this operation.");
    }

    //.all for concurrent mapping
    const results = Promise.all(
      ids.map(async (userId) => {
        const user = await User.findOneBy({ id: userId });
        if (!user) throw new GraphQLError("User not found");

        if (user.role === UserRole.Admin) {
          throw new GraphQLError("Admins cannot be blocked.");
        }

        switch (user.isBlocked) {
          case false:
            user.isBlocked = true;
            user.blocked_at = new Date();
            await user.save();

            return "User blocked and logged out of his account.";

          case true:
            user.isBlocked = false;
            await user.save();

            return `${user.nickname} account has been unblocked.`;

          default:
            throw new GraphQLError(`Unexpected block state.`);
        }
      })
    );
    return results;
  }

  @Authorized()
  @Query(() => [User])
  async searchUser(
    @Ctx() ctx: Context,
    @Arg("name") name: string
  ): Promise<User[]> {
    if (!ctx.currentUser) {
      throw new GraphQLError("You must be logged in");
    }

    if (!name.trim()) {
      throw new GraphQLError("Query cannot be empty");
    }

    const users = await User.createQueryBuilder("user")
      .where("user.id != :id", { id: ctx.currentUser.id })
      .andWhere(
        new Brackets((qb) => {
          qb.where("user.firstName ILIKE :name", { name: `%${name}%` })
            .orWhere("user.lastName ILIKE :name", { name: `%${name}%` })
            .orWhere("user.nickname ILIKE :name", { name: `%${name}%` });
        })
      )
      .getMany();

    return users;
  }

  //table users backoffice
  @Authorized([UserRole.Admin])
  @Query(() => [User])
  async getUsersPagination(
    @Ctx() ctx: Context,
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 9 }) limit: number
  ) {
    if (!ctx.currentUser)
      throw new GraphQLError(
        "You need to be logged in to have access to this operation."
      );

    if (ctx.currentUser.role !== "admin") {
      return new GraphQLError("You do not have permission to this operation.");
    }

    const findusers = await User.find({
      skip: offset,
      take: limit,
    });
    if (findusers.length === 0) throw new GraphQLError("Users were not found.");
    return findusers;
  }

  @Authorized([UserRole.User])
  @Query(() => User, { nullable: true })
  async getUserByNickname(
    @Ctx() ctx: Context,
    @Arg("nickname") nickname: string
  ): Promise<User | null> {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in");
    }

    const user = await User.findOne({
      where: {
        nickname: nickname,
      },
      relations: ["followers", "following"],
    });

    if (!user) {
      throw new GraphQLError("User not found");
    }

    return user;
  }
}

export default UserResolver;
