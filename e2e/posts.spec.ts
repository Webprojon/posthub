import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Posts", () => {
  test("should create post and see it in list", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('input[placeholder="Enter email"]');
    const passwordInput = page.locator('input[placeholder="Enter password"]');
    const loginButton = page.locator('button:has-text("Login")');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("password123");
    await loginButton.click();

    await page.waitForURL(`${BASE_URL}/posts`);

    const createButton = page.locator('a:has-text("Create Post"), button:has-text("Create Post")');
    await createButton.click();

    const titleInput = page.locator('input[placeholder="Enter post title"]');
    const bodyInput = page.locator('textarea[placeholder="Enter post content"]');
    const submitButton = page.locator('button:has-text("Create Post"):not(:has-text("Creating"))');

    await titleInput.fill("Test Post");
    await bodyInput.fill("This is a test post with content");
    await submitButton.click();

    await page.waitForURL(`${BASE_URL}/posts`);
    await expect(page.locator("text=Test Post")).toBeVisible();
  });

  test("should show validation errors", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('input[placeholder="Enter email"]');
    const passwordInput = page.locator('input[placeholder="Enter password"]');
    const loginButton = page.locator('button:has-text("Login")');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("password123");
    await loginButton.click();

    await page.waitForURL(`${BASE_URL}/posts`);

    const createButton = page.locator('a:has-text("Create Post"), button:has-text("Create Post")');
    await createButton.click();

    const submitButton = page.locator('button:has-text("Create Post"):not(:has-text("Creating"))');
    await submitButton.click();

    await expect(page.locator("text=Title is required")).toBeVisible();
  });
});
