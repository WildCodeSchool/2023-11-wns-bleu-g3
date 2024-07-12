import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";
import Post, { NewPostInput, UpdatePostInput } from "../entities/Post";

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
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<Post[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== UserRole.Admin) {
      throw new GraphQLError("You do not have permission");
    }

    const posts = await Post.find({
      relations: { user: true },
      where: { user: { id: userIdToFetch } },
    });

    return posts;
  }

  @Authorized()
  @Mutation(() => Post)
  async updatePost(
    @Ctx() ctx: Context,
    @Arg("postId") id: number,
    @Arg("data", { validate: true }) data: UpdatePostInput,
    @Arg("userId", { nullable: true }) userId?: number
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in !");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const postToUpdate = await Post.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!postToUpdate) throw new GraphQLError("Not found");

    if (userId && ctx.currentUser.role !== UserRole.Admin) {
      throw new GraphQLError("You are not the owner of this post !");
    }

    await Object.assign(postToUpdate, data);

    await postToUpdate.save();

    return Post.findOne({
      relations: { user: true },
      where: { id, user: { id: userIdToFetch } },
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
