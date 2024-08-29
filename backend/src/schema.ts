import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import ActivityTypeResolver from "./resolvers/ActivityTypeResolver";
import ActivityResolver from "./resolvers/ActivityResolver";
import PersonalVehicleResolver from "./resolvers/PersonalVehicleResolver";
import PostResolver from "./resolvers/PostResolver";
import LikeResolver from "./resolvers/LikeResolver";
import { FollowResolver } from "./resolvers/FollowResolver";
import DonationResolver from "./resolvers/DonationResolver";

export default buildSchema({
  resolvers: [
    UserResolver,
    ActivityTypeResolver,
    ActivityResolver,
    PersonalVehicleResolver,
    PostResolver,
    LikeResolver,
    FollowResolver,
    DonationResolver,
  ],
  authChecker,
});
