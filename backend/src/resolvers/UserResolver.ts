import { Arg, Mutation, Query, Ctx, Resolver, Authorized } from "type-graphql";
import User, { LoginInput, NewUserInput, ResetPasswordInput, ResetPasswordRequestInput } from "../entities/User";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../types";
import crypto from "crypto";
import mailer from "../mailer";
import { hash } from "argon2";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser !== null) throw new GraphQLError("EMAIL_ALREADY_TAKEN");

    const newUser = new User();
    Object.assign(newUser, data);

    const token = crypto.randomBytes(20).toString("hex");
    newUser.emailConfirmationToken = token;

    await mailer.sendMail({
      from: env.EMAIL_FROM,
      to: newUser.email,
      subject: "Bienvenue sur GreenFoot !",
      text: `Bienvue sur GreenFoot ${newUser.nickname} ! Pour confirmer votre email, cliquez sur ce lien: ${env.FRONTEND_URL}/emailConfirmation?token=${token}`,
    });

    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Mutation(() => Boolean)
  async confirmEmail(@Arg("token") token: string) {
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
      text: `Pour réinitialiser votre mot de passe, merci de cliquer sur le lien suivant : ${env.FRONTEND_URL}/resetPassword?token=${user.resetPasswordToken}`,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg("data", { validate: true }) data: ResetPasswordInput, @Arg("token") token: string) {
    const user = await User.findOneBy({ resetPasswordToken: token });
    if (!user) throw new GraphQLError("Invalid Token");
    user.hashedPassword = await hash(data.password);
    user.resetPasswordToken = null;
    return user.save().then(() => true);
  }

  @Query(() => [User])
  async profile() {
    return User.find();
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

    const token = jwt.sign(
      {
        userId: findUser.id,
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
}

export default UserResolver;
