import { expect, test } from "@playwright/test";

test("switches from Spanish to the complete English version and keeps the section", async ({ page }) => {
  await page.goto("/#proyectos");

  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  const englishLink = page.getByRole("link", { name: "View this page in English" });
  await expect(englishLink).toHaveAttribute("hreflang", "en");
  await expect(englishLink).toHaveAttribute("href", "/en#proyectos");
  await englishLink.click();

  await expect(page).toHaveURL(/\/en#proyectos$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 2, name: "Products built to solve concrete problems." })).toBeVisible();
  await expect(page.getByText("Public demo · In development", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Enable dark mode" })).toBeVisible();
});

test("publishes reciprocal language metadata and returns to Spanish", async ({ page }) => {
  await page.goto("/en#ia");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://llucbosch.com/en");
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute("href", "https://llucbosch.com/");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://llucbosch.com/en");

  const spanishLink = page.getByRole("link", { name: "Ver esta página en español" });
  await expect(spanishLink).toHaveAttribute("href", "/#ia");
  await spanishLink.click();

  await expect(page).toHaveURL(/\/#ia$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 2, name: "IA integrada en el proceso, no separada de la ingeniería." })).toBeVisible();
});
