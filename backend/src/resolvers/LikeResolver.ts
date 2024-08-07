import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import Like from "../entities/Like";
import Post from "../entities/Post";

@Resolver()
class LikeResolver {
  @Authorized()
  @Mutation(() => String)
  async likeAndDislikePost(
    @Ctx() ctx: Context,
    @Arg("postId") postId: number
  ): Promise<string> {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }

    const post = await Post.findOne({
      where: { id: postId },
      relations: ["likes"],
    });
    if (!post) {
      throw new GraphQLError("Post not found");
    }

    const existingLike = await Like.findOne({
      where: { post: { id: postId }, user: { id: ctx.currentUser.id } },
      relations: ["post", "user"],
    });

    if (existingLike) {
      await existingLike.remove();
      return "Like removed";
    } else {
      const like = new Like();
      like.user = ctx.currentUser;
      like.post = post;

      await like.save();
      return "Post liked";
    }
  }

  @Authorized()
  @Query(() => [Like])
  async getLikes(
    @Ctx() ctx: Context,
    @Arg("postId", { nullable: true }) postId?: number
  ): Promise<Like[]> {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }

    return await Like.find({
      relations: ["user", "post"],
      where: postId ? { post: { id: postId } } : {},
    });
  }
}

export default LikeResolver;
