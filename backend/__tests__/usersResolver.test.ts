import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";

describe("UsersResolver", () => {
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
