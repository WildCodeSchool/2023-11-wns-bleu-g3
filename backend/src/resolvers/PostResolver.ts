import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";
import Post, { NewPostInput, UpdatePostInput } from "../entities/Post";
import { ILike } from "typeorm";

@Resolver()
class PostResolver {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: NewPostInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const newPost = new Post();
    Object.assign(newPost, data);
    newPost.user = ctx.currentUser;

    return await newPost.save();
  }

  @Authorized()
  @Query(() => [Post])
  async getPosts(
    @Ctx() ctx: Context,
    @Arg("title", { nullable: true }) title?: string
  ): Promise<Post[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    return await Post.find({
      relations: { user: true },
      where: { title: title ? ILike(`%${title}%`) : undefined },
    });
  }

  @Authorized()
  @Mutation(() => Post)
  async updatePost(
    @Ctx() ctx: Context,
    @Arg("postId") id: number,
    @Arg("data", { validate: true }) data: UpdatePostInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in !");

    const postToUpdate = await Post.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!postToUpdate) throw new GraphQLError("Not found");

    if (
      postToUpdate?.user.id !== ctx.currentUser.id &&
      ctx.currentUser.role !== UserRole.Admin
    ) {
      throw new GraphQLError("You are not the owner of this post !");
    }

    await Object.assign(postToUpdate, data);

    await postToUpdate.save();

    return Post.findOne({
      relations: { user: true },
      where: { id },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deletePost(
    @Ctx() ctx: Context,
    @Arg("postId") id: number,
    @Arg("userId", { nullable: true }) userId?: number
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const postToDelete = await Post.findOne({
      where: { id, user: { id: userIdToFetch } },
      relations: { user: true },
    });

    if (
      ctx.currentUser.role !== UserRole.Admin &&
      postToDelete?.user.id !== ctx.currentUser.id
    )
      throw new GraphQLError("You are not the owner of this post !");

    if (!postToDelete) throw new GraphQLError("Not found");

    await postToDelete.remove();
    return "Post deleted";
  }
}

export default PostResolver;
