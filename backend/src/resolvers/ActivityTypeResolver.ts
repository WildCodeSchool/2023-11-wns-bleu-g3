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
import { Context } from "../types";
import {
  ActivityTypeInput,
  UpdateActivityTypeInput,
  Unit,
  Category,
} from "../entities/ActivityType";
import { UserRole } from "../entities/User";

@Resolver(ActivityType)
class ActivityTypeResolver {
  //queries
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

  //mutations
  @Authorized([UserRole.Admin]) 
  @Mutation(() => ActivityType)
  async createActivityType(
    @Arg("data", { validate: true }) data: ActivityTypeInput
  ) {
    const newActivityType = new ActivityType();
    Object.assign(newActivityType, data);

    return await newActivityType.save();
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => String)
  async deleteActivityType(@Arg("ActivityTypeId") id: number) {
    const activityTypeToDelete = await ActivityType.findOneBy({ id });
    if (!activityTypeToDelete) throw new GraphQLError("not found");
    await activityTypeToDelete.remove();
    return "ok";
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => ActivityType)
  async updateActivityType(
    @Arg("ActivityTypeId") id: number,
    @Arg("data", { validate: true }) data: UpdateActivityTypeInput
  ) {
    const activityTypeToUpdate = await ActivityType.findOneBy({ id });
    if (!activityTypeToUpdate) throw new GraphQLError("not found");
    Object.assign(activityTypeToUpdate, data);
    return await activityTypeToUpdate.save();
  }

  // Enums
  @Query(() => [Unit])
  getUnits(): Unit[] {
    return Object.values(Unit);
  }

  @Query(() => [Category])
  getCategories(): Category[] {
    return Object.values(Category);
  }
}

export default ActivityTypeResolver;
