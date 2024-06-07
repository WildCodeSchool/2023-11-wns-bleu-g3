import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";
import User, { UserRole } from "../../backend/src/entities/User";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can see user info", async ({ page }) => {
  const user = new User();
  Object.assign(user, {
    nickname: "Gretaaaaa",
    email: "greenGreta@app.com",
    password: "Visitor42@!",
    role: UserRole.User,
    emailVerified: true,
  });
  await user.save();

  const loginUser = await User.findOneBy({ email: "greenGreta@app.com" });
  expect(loginUser).toBeDefined();

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Réduisez votre empreinte carbone, préservez notre avenir.",
    })
  ).toBeVisible();
  await page.click("text=Connexion");
  await expect(
    page.getByRole("heading", { name: "Se connecter" })
  ).toBeVisible();
  await page.getByTestId("emailOrNickname").fill("greenGreta@app.com");
  await page.getByTestId("password").fill("Visitor42@!");
  await page.locator("form").getByRole("button", { name: "Connexion" }).click();

  await page.waitForURL("/dashboard", { timeout: 120000 });
  await page.goto("/profile");

  await page.getByRole("heading", { name: "Mon compte" });

  await expect(page.getByTestId("profile-form")).toContainText("Adresse mail");
  await expect(page.getByTestId("profile-form")).toContainText("Prénom");
  await expect(page.getByTestId("profile-form")).toContainText("Pseudo");
});
