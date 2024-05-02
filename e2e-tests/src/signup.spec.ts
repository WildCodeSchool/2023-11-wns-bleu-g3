import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can create account with valid data", async ({ page }) => {

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
  await page.click("text=Inscrivez-vous ici.");
  await expect(
    page.getByRole("heading", { name: "S'inscrire" })
  ).toBeVisible();
  await page.getByTestId("signup-email").fill("cacahuete@example.com");
  await page.getByTestId("signup-nickname").fill("cacahuète28");
  await page.getByTestId("signup-password").fill("4dminAdmin@!");
  await page.locator('form').getByRole('button', { name: 'Inscription' }).click();
  await expect(
    page.getByRole("heading", { name: "Se connecter" })
  ).not.toBeVisible();
});

