import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";

export default buildSchema({
  resolvers: [UserResolver],
});
