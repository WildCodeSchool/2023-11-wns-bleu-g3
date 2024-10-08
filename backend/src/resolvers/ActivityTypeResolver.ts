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
import {
  FuelType,
  VehicleDecade,
  VehicleType,
  MotoEngine,
} from "../entities/Enums/Vehicle_Attributes";
import { UserRole } from "../entities/User";

@Resolver(ActivityType)
class ActivityTypeResolver {
  //QUERIES
  @Query(() => [ActivityType])
  async getActivitiesTypes() {
    return ActivityType.find();
  }

  @Query(() => [ActivityType])
  async getActivitiesTypesPagination(
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 9 }) limit: number
  ) {
    return ActivityType.find({
      skip: offset,
      take: limit,
    });
  }

  @Query(() => ActivityType)
  async getActivityTypesById(@Arg("id", () => Int) id: number) {
    const activityType = await ActivityType.findOne({
      where: { id },
    });
    if (!activityType) throw new GraphQLError("not found");
    return activityType;
  }

  @Query(() => [ActivityType])
  async getActivityTypesByCategory(@Arg("category", () => Category) category: Category) {
    const activityTypes = await ActivityType.find({
      where: { category },
    });
    if (!activityTypes) throw new GraphQLError("not found");
    return activityTypes;
  }

  //MUTATIONS

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
    return "Activity successfully deleted.";
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => ActivityType)
  async updateActivityType(
    @Arg("ActivityTypeId") id: number,
    @Arg("data", { validate: true }) data: UpdateActivityTypeInput
  ) {
    const activityTypeToUpdate = await ActivityType.findOneBy({ id });
    if (!activityTypeToUpdate) throw new GraphQLError("Activity not found.");
    Object.assign(activityTypeToUpdate, data);
    return await activityTypeToUpdate.save();
  }

  // ENUMS

  @Query(() => [String])
  getUnits() {
    return Object.values(Unit);
  }
  @Query(() => [String])
  getCategories() {
    return Object.values(Category);
  }

  //vehicle enums
  @Query(() => [String])
  getFuelTypes() {
    return Object.values(FuelType);
  }
  @Query(() => [String])
  getVehicleDecade() {
    return Object.values(VehicleDecade);
  }
  @Query(() => [String])
  getVehicleTypes() {
    return Object.values(VehicleType);
  }
  @Query(() => [String])
  getMotoEngines() {
    return Object.values(MotoEngine);
  }
}

export default ActivityTypeResolver;
