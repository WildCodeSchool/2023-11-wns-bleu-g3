import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";
import getUsers from "./operations/getUsers";

describe("UsersResolver", () => {
  it("should read users", async () => {
    const userOne = new User();
    Object.assign(userOne, {
      nickname: "Gretaaaaa",
      email: "greenGreta@app.com",
      password: "Visitor42@!",
      lastName: "Thunberg",
    });
    await userOne.save();

    const userTwo = new User();
    Object.assign(userTwo, {
      nickname: "Gégé",
      email: "cacahuete28@example.fr",
      password: "Visitor43@!",
      lastName: "Gérard",
      FirstName: "Roger",
    });
    await userTwo.save();

    const res = await execute(getUsers);
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "profile": [
      {
        "avatarUrl": "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
        "email": "greenGreta@app.com",
        "firstName": null,
        "id": 1,
        "lastName": "Thunberg",
        "nickname": "Gretaaaaa",
        "role": "user",
      },
      {
        "avatarUrl": "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
        "email": "cacahuete28@example.fr",
        "firstName": null,
        "id": 2,
        "lastName": "Gérard",
        "nickname": "Gégé",
        "role": "user",
      },
    ],
  },
}
`);
  });

  it("should create a user with", async () => {
    const res = await execute(addUser, {
      data: {
        email: "toto@example.com",
        nickname: "toto",
        password: "Toto1234!",
      },
    });
    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "createUser": {
      "email": "toto@example.com",
      "nickname": "toto",
    },
  },
}
`);
    const userInDB = await User.findOneBy({ nickname: "toto" });

    expect(userInDB?.nickname).toMatchInlineSnapshot(`"toto"`);
    expect(userInDB?.email).toMatchInlineSnapshot(`"toto@example.com"`);
  });
});
