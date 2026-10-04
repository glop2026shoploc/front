import { test, expect } from "../fixtures";

test("la racine redirige vers la liste des artistes", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/artists$/);
});

test("affiche la liste des artistes", async ({ artistsPage }) => {
    await artistsPage.goto();
    await expect(artistsPage.heading).toBeVisible();
    await expect(artistsPage.artistLinks).toHaveCount(3);
});