import getUserJWT from "./getUserJWT";

export default async function () {
  const { JWT } = await getUserJWT();
  return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}