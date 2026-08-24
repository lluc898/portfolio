import { expect, test } from "@playwright/test";

test("opens and closes the mobile menu after navigation", async ({ page }) => {
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Menú" });
  const mobileMenu = page.locator("[data-mobile-menu]");

  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(mobileMenu).toBeHidden();
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(mobileMenu).toBeVisible();

  await mobileMenu.getByRole("link", { name: /Proyectos/ }).click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(mobileMenu).toBeHidden();
  await expect(page).toHaveURL(/#proyectos$/);
});
