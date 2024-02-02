import { test, expect, Locator, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page contains all steps", async ({ page }) => {
  await expect(page.getByRole("navigation").getByRole("listitem")).toHaveText(["1", "2", "3", "4"]);
});

test.describe("First step", () => {
  let nameInput: Locator;
  let emailInput: Locator;
  let phoneNumberInput: Locator;
  let nextStepButton: Locator;

  test.beforeEach(async ({ page }) => {
    nameInput = page.getByRole("textbox", { name: "Name" });
    emailInput = page.getByRole("textbox", { name: "Email Address" });
    phoneNumberInput = page.getByRole("textbox", { name: "Phone Number" });
    nextStepButton = page.getByRole("button", { name: "Next Step" });
  });

  test("validates first step is active", async ({ page }) => {
    await expect(page.getByRole("navigation").locator("[aria-current='step']")).toHaveText("1");
  });

  test("tests form contains correct input elements", async ({ page }) => {
    // Might be nice if I could join these assertions into a one-liner
    await expect(nameInput).toBeEditable();
    await expect(nameInput).toHaveAttribute("required");

    await expect(emailInput).toBeEditable();
    await expect(emailInput).toHaveAttribute("required");

    await expect(phoneNumberInput).toBeEditable();
    await expect(phoneNumberInput).toHaveAttribute("required");

    await expect(nextStepButton).toBeVisible();
  });

  test("submits empty form and shows errors", async ({ page }) => {
    await nextStepButton.click();

    await expect(getCurrentStep(page)).toHaveText("1");
    await expect(page.getByRole("alert")).toHaveText("This field is required");
  });

  test("shows error for invalid email", async ({ page }) => {
    await emailInput.fill("badlyformattedemail.com");
    await nextStepButton.click();

    const emailInputDescriptionId = await emailInput.getAttribute("aria-describedby");
    await expect(await page.locator(`id=${emailInputDescriptionId}`)).toHaveText("Email format is incorrect");
  });

  test("advances to step 2 on valid step 1 submission", async ({ page }) => {
    await emailInput.fill("badlyformattedemail.com");
    await nameInput.fill("Vanessa Mint");
    await phoneNumberInput.fill("+1 234 567 890");
    await nextStepButton.click();

    await expect(getCurrentStep(page)).toHaveText("2");
  });
});

function getCurrentStep(page: Page) {
  return page.getByRole("navigation").locator("[aria-current='step']");
}
