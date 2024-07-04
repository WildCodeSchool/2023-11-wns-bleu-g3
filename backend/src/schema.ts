import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import PersonalVehicleResolver from "./resolvers/PersonalVehicleResolver";
import { FollowerResolver } from "./resolvers/FollowerResolver";

export default buildSchema({
  resolvers: [UserResolver, ActivityTypeResolver, PersonalVehicleResolver, FollowerResolver],
  authChecker,
});
