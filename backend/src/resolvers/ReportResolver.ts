import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import Report from "../entities/Report";
import Post from "../entities/Post";

@Resolver()
class ReportResolver {
  @Authorized()
  @Mutation(() => String)
  async ReportTogglePost(
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

    const existingReport = await Report.findOne({
      where: { post: { id: postId }, user: { id: ctx.currentUser.id } },
      relations: ["post", "user"],
    });

    if (existingReport) {
      await existingReport.remove();
      return "Like removed";
    } else {
      const report = new Report();
      report.user = ctx.currentUser;
      report.post = post;

      await report.save();
      return "Post reported.";
    }
  }

  @Authorized()
  @Query(() => [Report])
  async getReports(
    @Ctx() ctx: Context,
    @Arg("postId", { nullable: true }) postId?: number
  ): Promise<Report[]> {
    if (!ctx.currentUser) {
      throw new GraphQLError("You need to be logged in!");
    }
    return await Report.find({
      relations: ["user", "post"],
      where: postId ? { post: { id: postId } } : {},
    });
  }
}

export default ReportResolver;
