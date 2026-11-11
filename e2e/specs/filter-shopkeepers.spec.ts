import { test, expect } from "../fixtures";

test.describe("US-207 : filtrer les commerçants par catégorie", () => {
    test.beforeEach(async ({ commercantsPage }) => {
        await commercantsPage.goto();
    });

    test("affiche tous les commerçants par défaut", async ({ commercantsPage }) => {
        await expect(commercantsPage.cards).toHaveCount(4);
    });

    test("filtre sur une catégorie", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Boulangerie");
        await expect(commercantsPage.cards).toHaveCount(1);
        await expect(commercantsPage.cards.first()).toContainText("Boulangerie du Centre");
    });

    test("met à jour la liste quand on change de catégorie", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Boulangerie");
        await commercantsPage.filterBy("Presse");
        await expect(commercantsPage.cards).toHaveCount(1);
        await expect(commercantsPage.cards.first()).toContainText("Presse du Marché");
    });

    test("revient à la liste complète avec Toutes", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Presse");
        await commercantsPage.filterBy("Toutes");
        await expect(commercantsPage.cards).toHaveCount(4);
    });

    test("affiche le commerce de la catégorie Alimentation", async ({ commercantsPage }) => {
        await commercantsPage.filterBy("Alimentation");
        await expect(commercantsPage.cards).toHaveCount(1);
        await expect(commercantsPage.cards.first()).toContainText("Épicerie du Quartier");
    });
});
