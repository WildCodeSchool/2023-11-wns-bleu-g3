import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Authorized,
  Ctx,
} from "type-graphql";
import ActivityType from "../entities/ActivityType";
import { GraphQLError } from "graphql/error";
import env from "../env";

@Resolver(ActivityType)
class ActivityTypeResolver {
  @Query(() => [ActivityType])
  async getActivitiesTypes() {
    return ActivityType.find();
  }

  @Query(() => ActivityType)
  async getActivityTypesById(@Arg("id", () => Int) id: number) {
    const activityType = await ActivityType.findOne({
      where: { id },
    });
    if (!activityType) throw new GraphQLError("not found");
    return activityType;
  }

  

}

export default ActivityTypeResolver;
