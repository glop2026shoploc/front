import { test, expect } from "../fixtures";

test("récupère et affiche le message du service catalogue", async ({ catalogueTestPage }) => {
    await catalogueTestPage.goto();

    await expect(catalogueTestPage.message).toBeVisible();
});
