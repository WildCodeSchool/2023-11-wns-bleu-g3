// import {
//   Resolver,
//   Query,
//   Mutation,
//   Arg,
//   Int,
//   Authorized,
//   Ctx,
// } from "type-graphql";
// import Activity from "../entities/Activity";
// import { GraphQLError } from "graphql/error";
// import env from "../env";
// import { Context } from "../types";
// import {
//   ActivityTypeInput,
//   UpdateActivityTypeInput,
//   Unit,
//   Category,
// } from "../entities/ActivityType";
// import {
//   FuelType,
//   VehicleDecade,
//   VehicleType,
//   MotoEngine,
// } from "../entities/Enums/Vehicle_Attributes";
// import { UserRole } from "../entities/User";

// @Resolver(Activity)
// class ActivityResolver {
//   //QUERIES
//   @Query(() => [Activity])
//   async getActivities() {
//     return Activity.find();
//   }

//   @Query(() => [Activity])
//   async getActivitiesTypesPagination(
//     @Arg("offset", () => Int, { nullable: true, defaultValue: 0 }) offset: number,
//     @Arg("limit", () => Int, { nullable: true, defaultValue: 9 }) limit: number
//   ) {
//     return Activity.find({
//       skip: offset,
//       take: limit,
//     });
//   }

//   @Query(() => Activity)
//   async getActivityTypesById(@Arg("id", () => Int) id: number) {
//     const activityType = await Activity.findOne({
//       where: { id },
//     });
//     if (!activityType) throw new GraphQLError("not found");
//     return activityType;
//   }

//   //MUTATIONS
//   @Authorized([UserRole.Admin])
//   @Mutation(() => Activity)
//   async createActivityType(
//     @Arg("data", { validate: true }) data: ActivityTypeInput
//   ) {
//     const newActivityType = new Activity();
//     Object.assign(newActivityType, data);

//     return await newActivityType.save();
//   }

//   @Authorized([UserRole.Admin])
//   @Mutation(() => String)
//   async deleteActivityType(@Arg("ActivityTypeId") id: number) {
//     const activityTypeToDelete = await Activity.findOneBy({ id });
//     if (!activityTypeToDelete) throw new GraphQLError("not found");
//     await activityTypeToDelete.remove();
//     return "Activity successfully deleted.";
//   }

//   @Authorized([UserRole.Admin])
//   @Mutation(() => Activity)
//   async updateActivityType(
//     @Arg("ActivityTypeId") id: number,
//     @Arg("data", { validate: true }) data: UpdateActivityTypeInput
//   ) {
//     const activityTypeToUpdate = await Activity.findOneBy({ id });
//     if (!activityTypeToUpdate) throw new GraphQLError("Activity not found.");
//     Object.assign(activityTypeToUpdate, data);
//     return await activityTypeToUpdate.save();
//   }

//   // ENUMS

//   @Query(() => [String])
//   getUnits() {
//     return Object.values(Unit);
//   }
//   @Query(() => [String])
//   getCategories() {
//     return Object.values(Category);
//   }

//   //vehicle enums
//   @Query(() => [String])
//   getFuelTypes() {
//     return Object.values(FuelType);
//   }
//   @Query(() => [String])
//   getVehicleDecade() {
//     return Object.values(VehicleDecade);
//   }
//   @Query(() => [String])
//   getVehicleTypes() {
//     return Object.values(VehicleType);
//   }
//   @Query(() => [String])
//   MotoEngine() {
//     return Object.values(MotoEngine);
//   }
// }

// export default ActivityResolver;
