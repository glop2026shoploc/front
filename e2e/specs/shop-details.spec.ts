import { test, expect } from "../fixtures";

const SHOP_ID = "00000000-0000-0000-0000-00000000000c";

test("affiche la fiche d'un commerce validé", async ({ shopDetailsPage }) => {
    await shopDetailsPage.goto(SHOP_ID);

    await expect(shopDetailsPage.text("Café du Marché")).toBeVisible();
    await expect(shopDetailsPage.text("4 place du Général de Gaulle, Lille")).toBeVisible();
    await expect(shopDetailsPage.row("Lundi")).toContainText("08:00 - 12:30, 14:00 - 19:00");
    await expect(shopDetailsPage.row("Mercredi")).toContainText("Fermé");
    await expect(shopDetailsPage.row("Café allongé")).toContainText("25 pts");
    await expect(shopDetailsPage.row("Croissant")).toContainText("Rupture de stock");
    await expect(shopDetailsPage.text("1 article(s) peuvent être payés avec vos points.")).toBeVisible();
});

test("affiche une page 404 pour un commerce en attente de validation", async ({ shopDetailsPage }) => {
    await shopDetailsPage.goto("00000000-0000-0000-0000-00000000000a");

    await expect(shopDetailsPage.text("This page could not be found.")).toBeVisible();
});
