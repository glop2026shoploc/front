import { test, expect } from "../fixtures";

test("navigue de la liste vers le détail d'un artiste", async ({
                                                                   page,
                                                                   artistsPage,
                                                                   artistDetailPage,
                                                               }) => {
    await artistsPage.goto();
    await artistsPage.artistLink("Daft Punk").click();
    await expect(page).toHaveURL(/\/artists\/daft-punk$/);
    await expect(artistDetailPage.heading("Daft Punk")).toBeVisible();
});

test("affiche les albums et tous les titres de l'artiste", async ({ artistDetailPage }) => {
    await artistDetailPage.goto("daft-punk");
    await expect(artistDetailPage.albumsSection.getByText("Discovery")).toBeVisible();
    await expect(artistDetailPage.trackRows).toHaveCount(5);
    await expect(artistDetailPage.trackRows.first()).toContainText("One More Time");
});

test("renvoie une 404 pour un artiste inconnu", async ({ page }) => {
    const response = await page.goto("/artists/inconnu");
    expect(response?.status()).toBe(404);
});