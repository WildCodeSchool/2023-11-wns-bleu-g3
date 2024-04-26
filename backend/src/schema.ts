import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";


export default buildSchema({
  resolvers: [UserResolver],
  authChecker,
});
