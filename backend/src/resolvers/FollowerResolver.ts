import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
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
    if (!userId) throw new GraphQLError("User id to follow required");

    const userToFollow = await User.findOne({ where: { id: userId } });
    if (!userToFollow) throw new GraphQLError("User to follow not found");

    if (ctx.currentUser.id === userId)
      throw new GraphQLError("You cannot follow yourself");

    const existingFollow = await Follow.findOne({
      where: {
        follower: ctx.currentUser,
        following: userToFollow,
      },
    });

    if (existingFollow)
      throw new GraphQLError("You are already following this person");

    const follow = Follow.create({
      follower: ctx.currentUser,
      following: userToFollow,
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
    if (!userId) throw new GraphQLError("User id to unfollow required");

    const userToUnfollow = await User.findOne({ where: { id: userId } });
    if (!userToUnfollow) throw new GraphQLError("User to unfollow not found");

    const follow = await Follow.findOne({
      where: {
        follower: ctx.currentUser,
        following: userToUnfollow,
      },
    });

    if (!follow) throw new GraphQLError("You don't follow this user");

    await follow.remove();

    return "User unfollowed successfully";
  }

  @Authorized()
  @Query(() => [User])
  async getFollowers(@Ctx() ctx: Context): Promise<User[]> {
    if (!ctx.currentUser) throw new Error("You need to be logged in!");

    const followers = await Follow.find({
      where: { following: ctx.currentUser },
      relations: ["follower"],
    });

    return followers.map((follow) => follow.follower);
  }

  @Authorized()
  @Query(() => [User])
  async getFollowing(@Ctx() ctx: Context): Promise<User[]> {
    if (!ctx.currentUser) throw new Error("You need to be logged in!");

    const following = await Follow.find({
      where: { follower: ctx.currentUser },
      relations: ["following"],
    });

    return following.map((follow) => follow.following);
  }

  @Authorized()
  @Query(() => [User])
  async getFollowersByUser(@Arg("userId") userId: number): Promise<User[]> {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const followers = await Follow.find({
      where: { following: user },
      relations: ["follower"],
    });

    return followers.map((follow) => follow.follower);
  }

  @Authorized()
  @Query(() => [User])
  async getFollowingByUser(@Arg("userId") userId: number): Promise<User[]> {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const following = await Follow.find({
      where: { follower: user },
      relations: ["following"],
    });

    return following.map((follow) => follow.following);
  }
}
