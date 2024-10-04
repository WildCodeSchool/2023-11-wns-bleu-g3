import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";
import gql from "graphql-tag";
import getJWTForUser from "./helpers/getUserJWT";

describe("Follow Mutation", () => {
  it("should allow a user to follow another user", async () => {
    await execute(addUser, {
      data: {
        email: "user1@test.com",
        nickname: "user1",
        password: "Password1!",
      },
    });

    await execute(addUser, {
      data: {
        email: "user2@test.com",
        nickname: "user2",
        password: "Password2!",
      },
    });

    const user1 = await User.findOneBy({ email: "user1@test.com" });
    const user2 = await User.findOneBy({ email: "user2@test.com" });

    const { JWT } = await getJWTForUser(user1!);

    const req = { headers: { authorization: `Bearer ${JWT}` } };

    const FOLLOW_MUTATION = gql`
      mutation Follow($userId: Float!) {
        follow(userId: $userId) {
          id
        }
      }
    `;

    const result = await execute(
      FOLLOW_MUTATION,
      { userId: user2?.id },
      { req }
    );

    expect(result.errors).toBeUndefined();
    expect((result.data as { follow: { id: number } })?.follow.id).toBe(
      user1?.id
    );

    const updatedUser1 = await User.findOne({
      where: { id: user1?.id },
      relations: ["following"],
    });
    expect(updatedUser1!.following).toHaveLength(1);
    expect(updatedUser1!.following?.[0]?.id).toBe(user2?.id);
  });
});

describe("Get Followers By User Query", () => {
  it("should return followers of the current user", async () => {
    await execute(addUser, {
      data: {
        email: "user1@test.com",
        nickname: "user1",
        password: "Password1!",
      },
    });

    await execute(addUser, {
      data: {
        email: "user2@test.com",
        nickname: "user2",
        password: "Password2!",
      },
    });

    const user1 = await User.findOneBy({ email: "user1@test.com" });
    const user2 = await User.findOneBy({ email: "user2@test.com" });

    user2!.following = [user1!];
    await user2!.save();

    const { JWT } = await getJWTForUser(user1!);

    const req = { headers: { authorization: `Bearer ${JWT}` } };

    const GET_FOLLOWERS_QUERY = gql`
      query GetFollowersByUser {
        getFollowersByUser {
          id
        }
      }
    `;

    const result = await execute(GET_FOLLOWERS_QUERY, {}, { req });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getFollowersByUser).toHaveLength(1);
    expect(
      (result.data as { getFollowersByUser: { id: number }[] })
        .getFollowersByUser[0].id
    ).toBe(user2?.id);
  });
});

describe("Unfollow Mutation", () => {
  it("should allow a user to unfollow another user", async () => {
    await execute(addUser, {
      data: {
        email: "user1@test.com",
        nickname: "user1",
        password: "Password1!",
      },
    });

    await execute(addUser, {
      data: {
        email: "user2@test.com",
        nickname: "user2",
        password: "Password2!",
      },
    });

    const user1 = await User.findOneBy({ email: "user1@test.com" });
    const user2 = await User.findOneBy({ email: "user2@test.com" });

    const { JWT } = await getJWTForUser(user1!);
    const req = { headers: { authorization: `Bearer ${JWT}` } };

    const FOLLOW_MUTATION = gql`
      mutation Follow($userId: Float!) {
        follow(userId: $userId) {
          id
        }
      }
    `;
    await execute(FOLLOW_MUTATION, { userId: user2?.id }, { req });

    let updatedUser1 = await User.findOne({
      where: { id: user1?.id },
      relations: ["following"],
    });
    expect(updatedUser1!.following).toHaveLength(1);
    expect(updatedUser1!.following?.[0]?.id).toBe(user2?.id);

    const UNFOLLOW_MUTATION = gql`
      mutation Unfollow($userId: Float!) {
        unfollow(userId: $userId) {
          id
        }
      }
    `;
    const result = await execute(
      UNFOLLOW_MUTATION,
      { userId: user2?.id },
      { req }
    );

    expect(result.errors).toBeUndefined();
    expect((result.data as { unfollow: { id: number } }).unfollow.id).toBe(
      user1?.id
    );

    updatedUser1 = await User.findOne({
      where: { id: user1?.id },
      relations: ["following"],
    });
    expect(updatedUser1!.following).toHaveLength(0);
  });
});

describe("Get Following By User Query", () => {
  it("should return the users that the current user is following", async () => {
    await execute(addUser, {
      data: {
        email: "user1@test.com",
        nickname: "user1",
        password: "Password1!",
      },
    });

    await execute(addUser, {
      data: {
        email: "user2@test.com",
        nickname: "user2",
        password: "Password2!",
      },
    });

    const user1 = await User.findOneBy({ email: "user1@test.com" });
    const user2 = await User.findOneBy({ email: "user2@test.com" });

    user1!.following = [user2!];
    await user1!.save();

    const { JWT } = await getJWTForUser(user1!);
    const req = { headers: { authorization: `Bearer ${JWT}` } };

    const GET_FOLLOWING_QUERY = gql`
      query GetFollowingByUser {
        getFollowingByUser {
          id
        }
      }
    `;

    const result = await execute(GET_FOLLOWING_QUERY, {}, { req });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getFollowingByUser).toHaveLength(1);
    expect(
      (result.data as { getFollowingByUser: { id: number }[] })
        .getFollowingByUser[0].id
    ).toBe(user2?.id);
  });
});
