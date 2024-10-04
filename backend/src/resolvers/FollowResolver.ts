import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/User";
import { Context } from "../types";
import { GraphQLError } from "graphql";

@Resolver()
export class FollowResolver {
  @Authorized()
  @Query(() => [User])
  async getFollowersByUser(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<User[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const user = await User.findOne({
      where: {
        id: userIdToFetch,
      },
      relations: ["followers"],
    });

    return user!.followers || [];
  }

  @Authorized()
  @Query(() => [User])
  async getFollowingByUser(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<User[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const user = await User.findOne({
      where: {
        id: userIdToFetch,
      },
      relations: ["following"],
    });

    return user!.following || [];
  }

  @Authorized()
  @Mutation(() => User)
  async follow(
    @Ctx() ctx: Context,
    @Arg("userId") userId: number
  ): Promise<User> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    if (userId === ctx.currentUser.id)
      throw new GraphQLError("You can't follow yourself");

    const userToFollow = await User.findOne({ where: { id: userId } });

    if (!userToFollow) throw new GraphQLError("User not found");

    if (!ctx.currentUser.following) {
      ctx.currentUser.following = [];
    }

    ctx.currentUser.following.push(userToFollow);
    await ctx.currentUser.save();

    return ctx.currentUser;
  }

  @Authorized()
  @Mutation(() => User)
  async unfollow(
    @Ctx() ctx: Context,
    @Arg("userId") userId: number
  ): Promise<User> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");
    if (userId === ctx.currentUser.id)
      throw new GraphQLError("You can't unfollow yourself");

    const userToUnfollow = await User.findOne({ where: { id: userId } });

    if (!userToUnfollow) throw new GraphQLError("User not found");

    if (!ctx.currentUser.following) {
      ctx.currentUser.following = [];
    }

    ctx.currentUser.following = ctx.currentUser.following.filter(
      (user) => user.id !== userId
    );
    await ctx.currentUser.save();

    return ctx.currentUser;
  }
}
