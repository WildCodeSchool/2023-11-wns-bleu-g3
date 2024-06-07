import { Arg, Mutation, Query, Resolver } from "type-graphql";
import PersonalVehicle, { NewPersonalVehicleInput } from "../entities/PersonalVehicle";
import { GraphQLError } from "graphql";

@Resolver()
class PersonalVehicleResolver {
  @Mutation(() => PersonalVehicle)
  async createPersonalVehicle(@Arg("data", { validate: true }) data: NewPersonalVehicleInput) {
    const newVehicle = new PersonalVehicle();
    Object.assign(newVehicle, data);

    const newPersonalVehicle = await newVehicle.save();
    return newPersonalVehicle;
  }

  @Query(() => [PersonalVehicle])
  async getPersonalVehicles(@Arg("userId") userId: number) {
    if (!userId) throw new GraphQLError("User not found.");
    return PersonalVehicle.find({
      relations: {user: true},
      where: { user: {id: userId} },
    });
  }
}

export default PersonalVehicleResolver;