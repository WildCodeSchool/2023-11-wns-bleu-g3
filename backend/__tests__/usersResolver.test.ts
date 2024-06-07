import { execute } from "../jest.setup";
import User from "../src/entities/User";
import addUser from "./operations/addUser";

const { mock } = require('nodemailer');

describe("UsersResolver", () => {
  it("should create a user with", async () => {
    const sentEmails = mock.getSentMail()
    const res = await execute(addUser, {
      data: {
        email: "toto@example.com",
        nickname: "toto",
        password: "Toto1234!",
      },
    });
    expect(sentEmails.length).toBe(1);
    expect(sentEmails[0].to).toBe('toto@example.com');
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
