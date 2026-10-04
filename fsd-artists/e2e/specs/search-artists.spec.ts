import { test, expect } from "../fixtures";

test("filtre les artistes par nom", async ({ artistsPage }) => {
    await artistsPage.goto();
    await artistsPage.search("radio");
    await expect(artistsPage.artistLinks).toHaveCount(1);
    await expect(artistsPage.artistLink("Radiohead")).toBeVisible();
});

test("affiche un message quand aucun artiste ne correspond", async ({ artistsPage }) => {
    await artistsPage.goto();
    await artistsPage.search("zzz");
    await expect(artistsPage.emptyMessage).toBeVisible();
});