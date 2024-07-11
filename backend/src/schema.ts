import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import ActivityResolver from "./resolvers/ActivityResolver";


export default buildSchema({
  resolvers: [UserResolver, ActivityTypeResolver, ActivityResolver],
  authChecker,
});
