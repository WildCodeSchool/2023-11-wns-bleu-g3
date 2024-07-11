import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  Ctx,
} from "type-graphql";
import Activity from "../entities/Activity";
import {
  NewActivityInput,
} from "../entities/Activity";
import { Context } from "../types";
import { GraphQLError } from "graphql";

@Resolver(Activity)
class ActivityResolver {
  //QUERIES
  @Authorized()
  @Query(() => [Activity])
  async getActivities(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<Activity[]>{
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== "admin") {
      throw new GraphQLError("You do not have permission.");
    }

    const activities = await Activity.find({
      relations: { user: true, activityType: true },
      where: { user: { id: userIdToFetch } },
    });
    return activities;
  }

  //MUTATIONS
  @Authorized()
  @Mutation(() => Activity)
  async createActivity(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: NewActivityInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const newActivity = new Activity();
    Object.assign(newActivity, data);
    newActivity.user = ctx.currentUser;

    return await newActivity.save();
  }
}

export default ActivityResolver;
