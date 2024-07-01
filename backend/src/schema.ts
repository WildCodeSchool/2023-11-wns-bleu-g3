import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import PersonalVehicleResolver from "./resolvers/PersonalVehicleResolver";


export default buildSchema({
  resolvers: [UserResolver, ActivityTypeResolver, PersonalVehicleResolver],
  authChecker,
});
