import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import PersonalVehicle, {
  NewPersonalVehicleInput,
} from "../entities/PersonalVehicle";
import { GraphQLError } from "graphql";
import { Context } from "../types";

@Resolver()
class PersonalVehicleResolver {
  @Authorized()
  @Mutation(() => PersonalVehicle)
  async createPersonalVehicle(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: NewPersonalVehicleInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const newVehicle = new PersonalVehicle();
    Object.assign(newVehicle, data);
    newVehicle.user = ctx.currentUser;

    const newPersonalVehicle = await newVehicle.save();
    return newPersonalVehicle;
  }

  @Authorized()
  @Query(() => [PersonalVehicle])
  async getPersonalVehicles(
    @Ctx() ctx: Context,
    @Arg("userId", {nullable: true}) userId?: number
  ): Promise<PersonalVehicle[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== "admin") {
      throw new GraphQLError("You do not have permission");
    }

    const personalVehicles = await PersonalVehicle.find({
      relations: { user: true },
      where: { user: { id: userIdToFetch } },
    });

    return personalVehicles;
  }
}

export default PersonalVehicleResolver;
