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

    if (
      await Follow.findOne({
        where: {
          follower: ctx.currentUser,
          user: userToFollow,
        },
      })
    )
      throw new GraphQLError("You are already following this person");

    const follow = Follow.create({
      follower: ctx.currentUser,
      user: userToFollow,
    });

    await follow.save();

    return follow;
  }

  @Authorized()
  @Mutation(() => String)
  async unfollow(
    @Arg("userId") userId: number,
    @Ctx() ctx: Context
  ): Promise<String> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    if (!userId) throw new GraphQLError("User id to unfollow requiried");

    const userToUnfollow = await User.findOne({ where: { id: userId } });
    if (!userToUnfollow) throw new GraphQLError("User to unfollow not found");

    const unfollow = await Follow.findOneBy({
      follower: ctx.currentUser,
      user: userToUnfollow,
    });

    if (!unfollow) throw new GraphQLError("You don't follow this user");

    await unfollow.remove();

    return "User unfollow successfully";
  }
}
