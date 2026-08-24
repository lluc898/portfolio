import { expect, test } from "@playwright/test";

test("presents the profile and opens the featured projects", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /Lluc Bosch\s*Ramis/ })).toBeVisible();

  const projectsCta = page.getByRole("link", { name: "Ver proyectos" });
  await expect(projectsCta).toHaveAttribute("href", "#proyectos");
  await projectsCta.click();

  await expect(page).toHaveURL(/#proyectos$/);
  await expect(page.getByRole("heading", { level: 2, name: /Productos construidos/ })).toBeVisible();
});

test("offers a downloadable CV", async ({ page, request }) => {
  await page.goto("/");

  const cvLink = page.getByRole("link", { name: "Descargar CV" }).first();
  await expect(cvLink).toHaveAttribute("href", "/cv-lluc-bosch-ramis.pdf");
  await expect(cvLink).toHaveAttribute("download", "");

  const response = await request.get("/cv-lluc-bosch-ramis.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("persists the selected color theme", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("theme", "light"));
  await page.reload();

  const themeToggle = page.getByRole("button", { name: "Activar modo oscuro" });
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await themeToggle.click();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Activar modo claro" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
