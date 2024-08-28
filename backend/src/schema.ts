import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import ActivityResolver from "./resolvers/ActivityResolver";
import PersonalVehicleResolver from "./resolvers/PersonalVehicleResolver";
import { FollowerResolver } from "./resolvers/FollowerResolver";
import PostResolver from "./resolvers/PostResolver";
import LikeResolver from "./resolvers/LikeResolver";
import DonationResolver from "./resolvers/DonationResolver";

export default buildSchema({
  resolvers: [
    UserResolver,
    ActivityTypeResolver,
    ActivityResolver,
    PersonalVehicleResolver,
    FollowerResolver,
    PostResolver,
    LikeResolver,
    DonationResolver,
  ],
  authChecker,
});
