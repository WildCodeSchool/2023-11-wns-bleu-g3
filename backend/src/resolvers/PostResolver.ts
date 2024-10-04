import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Int,
} from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";
import Post, { NewPostInput, UpdatePostInput } from "../entities/Post";
import Like from "../entities/Like";
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

    const posts = await Post.find({
      relations: { user: true, likes: true },
      where: { title: title ? ILike(`%${title}%`) : undefined },
    });

    for (const post of posts) {
      const likeCount = await Like.count({ where: { post: { id: post.id } } });
      post.nbOfLikes = likeCount;
    }

    return posts;
  }

  @Query(() => [Post])
  async getPostsPagination(
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 8 }) limit: number
  ) {
    const posts = await Post.find({
      relations: { user: true, likes: true },
      skip: offset,
      take: limit,
    });

    for (const post of posts) {
      const likeCount = await Like.count({ where: { post: { id: post.id } } });
      post.nbOfLikes = likeCount;
    }

    return posts;
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
