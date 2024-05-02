import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";
import User, { UserRole } from "../../backend/src/entities/User";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can go to home page", async ({ page }) => {
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

  const visitor = new User();
  Object.assign(visitor, {
    nickname: "Visitor",
    email: "visitor@app.com",
    password: "4dminAdmin@!",
  });
  await visitor.save();

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Réduisez votre empreinte carbone, préservez notre avenir." })).toBeVisible();
});
