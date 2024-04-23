import { buildSchema } from "type-graphql";
import Test from "./resolvers/test";

export default buildSchema({
  resolvers: [Test],
});
