import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";
import Like from "../entities/Like";
import Post from "../entities/Post";

@Resolver()
class LikeResolver {
  @Authorized()
  @Mutation(() => Like)
  async likePost(
    @Ctx() ctx: Context,
    @Arg("postId") postId: number,
    @Arg("likeId", { nullable: true }) likeId: number
  ): Promise<Like> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) throw new GraphQLError("Post not found");

    const existingLike = await Like.findOne({
      where: { post: { id: postId }, user: { id: ctx.currentUser.id } },
    });

    if (existingLike) {
      await existingLike.remove();
      throw new GraphQLError("deleted");
    }

    const like = new Like();
    like.user = ctx.currentUser;
    like.post = post;

    return await like.save();
  }

  @Authorized()
  @Mutation(() => String)
  async unlikePost(
    @Ctx() ctx: Context,
    @Arg("likeId") likeId: number
  ): Promise<string> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const like = await Like.findOne({
      where: { id: likeId },
      relations: { user: true },
    });

    if (!like) throw new GraphQLError("Like not found");

    if (
      like.user.id !== ctx.currentUser.id &&
      ctx.currentUser.role !== UserRole.Admin
    ) {
      throw new GraphQLError("You are not the owner of this like!");
    }

    await like.remove();
    return "Like removed";
  }

  @Authorized()
  @Query(() => [Like])
  async getLikes(
    @Ctx() ctx: Context,
    @Arg("postId", { nullable: true }) postId?: number
  ): Promise<Like[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    return await Like.find({
      relations: { user: true, post: true },
      where: postId ? { post: { id: postId } } : {},
    });
  }
}

export default LikeResolver;
