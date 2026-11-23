import { test, expect } from "../fixtures";

test.describe("US-207 : filtrer les commerçants par catégorie", () => {
    test.beforeEach(async ({ commercantsPage }) => {
        await commercantsPage.goto();
    });

    test("affiche tous les commerçants par défaut", async ({ commercantsPage }) => {
        await expect(commercantsPage.cards).toHaveCount(3);
    });

    test("filtre sur une catégorie", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Boulangerie");
        await expect(commercantsPage.cards).toHaveCount(2);
        await expect(commercantsPage.cards).toContainText(["Au Bon Pain", "La Fournée du Moulin"]);
    });

    test("met à jour la liste quand on change de catégorie", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Boulangerie");
        await commercantsPage.filterBy("Librairie");
        await expect(commercantsPage.cards).toHaveCount(1);
        await expect(commercantsPage.cards.first()).toContainText("Librairie des Tilleuls");
    });

    test("revient à la liste complète avec Toutes", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Librairie");
        await commercantsPage.filterBy("Toutes");
        await expect(commercantsPage.cards).toHaveCount(3);
    });

    test("affiche le message quand une catégorie ne contient aucun commerce", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Café");
        await expect(commercantsPage.cards).toHaveCount(0);
        await expect(commercantsPage.emptyMessage).toBeVisible();
    });

    test("ne montre pas un commerce en attente de validation", async ({ commercantsPage }) => {
        await expect(commercantsPage.pendingShopName).toHaveCount(0);
    });
});
