import { test, expect } from "@playwright/test";

test.describe("UserManager component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should allow adding a new user", async ({ page }) => {
    await page.locator("button", { hasText: "Add User" }).click();

    await page.locator("#mui-component-select-gender").click();
    await page.waitForSelector('ul[role="listbox"]');
    await page.locator('li[data-value="Male"]').click();
    await page.locator('input[name="firstName"]').fill("Johnny");
    await page.locator('input[name="lastName"]').fill("Candoe");
    await page.locator('input[name="age"]').fill("30");

    await page.locator("form").locator('button[type="submit"]').click();

    const alert = await page.locator('[role="status"]');
    await expect(alert).toHaveText("User added");
  });

  test("should allow editing an existing user", async ({ page }) => {
    await page
      .locator("tr >> nth=1")
      .locator("button", { hasText: "Edit" })
      .click();

    await page.locator('input[name="firstName"]').fill("Janey");

    await page.locator("form").locator('button[type="submit"]').click();

    const alert = await page.locator('[role="status"]');
    await expect(alert).toHaveText("User updated");
  });

  test("should allow deleting a user", async ({ page }) => {
    await page
      .locator("tr >> nth=1")
      .locator('button[aria-label="delete"]')
      .click();

    await page.locator("button", { hasText: "Delete" }).click();

    const userRows = await page.locator("table tbody tr");

    await expect(userRows).toHaveCount(11);
  });

  test("should sort users by first name", async ({ page }) => {
    await page.locator("th", { hasText: "First Name" }).click();

    const firstRowFirstName = await page
      .locator("table tbody tr >> nth=0")
      .locator("td >> nth=1")
      .textContent();
    const secondRowFirstName = await page
      .locator("table tbody tr >> nth=1")
      .locator("td >> nth=1")
      .textContent();

    expect(firstRowFirstName!.localeCompare(secondRowFirstName!)).toBeLessThan(
      0,
    );
  });
});
