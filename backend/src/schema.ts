import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import { FollowerResolver } from "./resolvers/FollowerResolver";


export default buildSchema({
  resolvers: [UserResolver, ActivityTypeResolver, FollowerResolver],
  authChecker,
});
