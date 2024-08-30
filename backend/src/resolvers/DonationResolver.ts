import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../types";
import { UserRole } from "../entities/User";
import Like from "../entities/Like";
import { ILike } from "typeorm";
import Donation, { NewDonationInput } from "../entities/Donation";

@Resolver()
class DonationResolver {
  @Authorized()
  @Mutation(() => Donation)
  async createDonation(
    @Ctx() ctx: Context,
    @Arg("data", { validate: true }) data: NewDonationInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const newDonation = new Donation();
    Object.assign(newDonation, data);
    newDonation.user = ctx.currentUser;

    return await newDonation.save();
  }

  @Authorized()
  @Query(() => [Donation])
  async getDonations(
    @Ctx() ctx: Context,
    @Arg("userId", { nullable: true }) userId?: number
  ): Promise<Donation[]> {
    if (!ctx.currentUser) throw new GraphQLError("You need to be logged in!");

    const donations = await Donation.find({
      relations: { user: true },
      where: { user: { id: userId } },
    });

    return donations;
  }
}

export default DonationResolver;
