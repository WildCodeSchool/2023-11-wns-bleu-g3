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

    const currentUser = await User.findOne({
      where: { id: ctx.currentUser.id },
      relations: ["following"],
    });

    if (!currentUser) throw new GraphQLError("Current user not found");

    const userToFollow = await User.findOne({ where: { id: userId } });

    if (!userToFollow) throw new GraphQLError("User not found");

    if (!currentUser.following) {
      currentUser.following = [];
    }

    currentUser.following.push(userToFollow);
    await currentUser.save();

    return currentUser;
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

    const currentUser = await User.findOne({
      where: { id: ctx.currentUser.id },
      relations: ["following"],
    });

    if (!currentUser) throw new GraphQLError("Current user not found");

    const userToUnfollow = await User.findOne({ where: { id: userId } });

    if (!userToUnfollow) throw new GraphQLError("User not found");

    if (!currentUser.following) {
      currentUser.following = [];
    }

    currentUser.following = currentUser.following.filter(
      (user) => user.id !== userId
    );
    await currentUser.save();

    return currentUser;
  }
}
