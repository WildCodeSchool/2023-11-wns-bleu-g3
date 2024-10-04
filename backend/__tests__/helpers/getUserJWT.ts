import jwt from "jsonwebtoken";
import User from "../../src/entities/User";
import env from "../../src/env";

export default async function getJWTForUser(user: User) {
  const JWT = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
  return { JWT };
}
