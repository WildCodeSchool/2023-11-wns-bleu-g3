import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import PersonalVehicle, {
  NewPersonalVehicleInput,
  UpdatePersonalVehicleInput,
} from "../entities/PersonalVehicle";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";

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
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<PersonalVehicle[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    if (userId && ctx.currentUser.role !== UserRole.Admin) {
      throw new GraphQLError("You do not have permission");
    }

    const personalVehicles = await PersonalVehicle.find({
      relations: { user: true },
      where: { user: { id: userIdToFetch } },
    });

    return personalVehicles;
  }

  @Authorized()
  @Mutation(() => PersonalVehicle)
  async updatePersonalVehicle(
    @Ctx() ctx: Context,
    @Arg("personalVehicleId") id: number,
    @Arg("data", { validate: true }) data: UpdatePersonalVehicleInput,
    @Arg("userId", { nullable: true }) userId?: number
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in !");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const personalVehicleToUpdate = await PersonalVehicle.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!personalVehicleToUpdate) throw new GraphQLError("Not found");

    if (userId && ctx.currentUser.role !== UserRole.Admin) {
      throw new GraphQLError("You are not the owner of this vehicle !");
    }

    await Object.assign(personalVehicleToUpdate, data);

    await personalVehicleToUpdate.save();

    return PersonalVehicle.findOne({
      relations: { user: true },
      where: { id, user: { id: userIdToFetch } },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deletePersonalVehicle(
    @Ctx() ctx: Context,
    @Arg("personalVehicleId") id: number,
    @Arg("userId", { nullable: true }) userId?: number
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const userIdToFetch = userId ?? ctx.currentUser.id;

    const personalVehicleToDelete = await PersonalVehicle.findOne({
      where: { id, user: { id: userIdToFetch } },
      relations: { user: true },
    });

    if (
      ctx.currentUser.role !== UserRole.Admin &&
      personalVehicleToDelete?.user.id !== ctx.currentUser.id
    )
      throw new GraphQLError("You are not the owner of this vehicle !");

    if (!personalVehicleToDelete) throw new GraphQLError("Not found");

    await personalVehicleToDelete.remove();
    return "Vehicle deleted";
  }
}

export default PersonalVehicleResolver;
