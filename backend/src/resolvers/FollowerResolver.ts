import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Follow } from "../entities/Follow";
import { Context } from "../types";
import { GraphQLError } from "graphql";
import User from "../entities/User";

@Resolver()
export class FollowerResolver {
  @Authorized()
  @Mutation(() => Follow)
  async followUser(
    @Arg("userId") userId: number,
    @Ctx() ctx: Context
  ): Promise<Follow> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    if (!userId) throw new GraphQLError("User id to follow requiried");

    const userToFollow = await User.findOne({ where: { id: userId } });
    if (!userToFollow) throw new GraphQLError("User to follow not found");

    if (ctx.currentUser.id === userId)
      throw new GraphQLError("You cannot follow yourself");

    const follow = Follow.create({
      follower: ctx.currentUser,
      user: userToFollow,
    });

    await follow.save();

    return follow;
  }
}
