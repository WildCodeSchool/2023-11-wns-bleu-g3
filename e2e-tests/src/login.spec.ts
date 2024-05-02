import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";
import User, { UserRole } from "../../backend/src/entities/User";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can login with email", async ({ page }) => {
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

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
  await page.getByTestId("emailOrNickname").fill("admin@app.com");
  await page.getByTestId("password").fill("4dminAdmin@!");
  await page.locator('form').getByRole('button', { name: 'Connexion' }).click();
  await expect(
    page.getByRole("heading", { name: "Se connecter" })
  ).not.toBeVisible();
});

test("can login with nickname", async ({ page }) => {
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

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
  await page.getByTestId("emailOrNickname").fill("admin");
  await page.getByTestId("password").fill("4dminAdmin@!");
  await page.locator('form').getByRole('button', { name: 'Connexion' }).click();
  await expect(
    page.getByRole("heading", { name: "Se connecter" })
  ).not.toBeVisible();
});

test("can't login with invalid credentials", async ({ page }) => {
  const admin = new User();
  Object.assign(admin, {
    nickname: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
    emailVerified: true,
  });
  await admin.save();

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
  await page.getByTestId("emailOrNickname").fill("admn");
  await page.getByTestId("password").fill("4dminAdmin@!");
  await page.locator('form').getByRole('button', { name: 'Connexion' }).click();
  await expect(page.getByTestId("login-error")).toContainText("Identifiants incorrects");
});
