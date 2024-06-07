import { Arg, Mutation, Resolver } from "type-graphql";
import PersonalVehicle, { NewPersonalVehicleInput } from "../entities/PersonalVehicle";

@Resolver()
class PersonalVehicleResolver {
  @Mutation(() => PersonalVehicle)
  async createPersonalVehicle(@Arg("data", { validate: true }) data: NewPersonalVehicleInput) {
    const newVehicle = new PersonalVehicle();
    Object.assign(newVehicle, data);

    const newPersonalVehicle = await newVehicle.save();
    return newPersonalVehicle;
  }
}

export default PersonalVehicleResolver;