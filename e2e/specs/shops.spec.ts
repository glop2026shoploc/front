import { test, expect } from "../fixtures";
import { LILLE_ID, VILLE_SANS_COMMERCE_ID } from "../page-objects/shops.page";

test("renvoie vers la connexion quand personne n'est connecté", async ({ shopsPage }) => {
    await shopsPage.goto();

    await expect(shopsPage.page).toHaveURL(/\/signin$/);
});

test("réserve la liste aux clients", async ({ shopsPage }) => {
    await shopsPage.loginAsMerchant();
    await shopsPage.goto();

    await expect(shopsPage.clientsOnlyAlert).toBeVisible();
    await expect(shopsPage.shopCards).toHaveCount(0);
});

test("affiche les commerçants de la ville de l'utilisateur connecté, avec leur catégorie", async ({ shopsPage }) => {
    await shopsPage.loginAsClient(LILLE_ID);
    await shopsPage.goto();

    await expect(shopsPage.shopCards).toHaveCount(3);
    await expect(shopsPage.shopCard("Au Bon Pain")).toContainText("Boulangerie");
});

test("n'affiche que les commerçants de la ville du client", async ({ shopsPage }) => {
    await shopsPage.loginAsClient(VILLE_SANS_COMMERCE_ID);
    await shopsPage.goto();

    await expect(shopsPage.shopCards).toHaveCount(0);
    await expect(shopsPage.page.getByText("Aucun commerçant trouvé")).toBeVisible();
});

test("propose un itinéraire Google Maps vers chaque commerçant", async ({ shopsPage }) => {
    await shopsPage.loginAsClient(LILLE_ID);
    await shopsPage.goto();

    await expect(shopsPage.shopCard("Au Bon Pain").getByRole("link", { name: "Itinéraire Google Maps" })).toHaveAttribute(
        "href",
        /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=.*Lille$/
    );
});

test("n'utilise pas la position tant que l'utilisateur ne l'a pas demandé", async ({ shopsPage }) => {
    await shopsPage.allowPosition(50.6292, 3.0573);
    await shopsPage.loginAsClient(LILLE_ID);
    await shopsPage.goto();

    await expect(shopsPage.useMyPositionButton).toBeVisible();
    await expect(shopsPage.shopCards.first()).not.toContainText("de vous");
});

test("affiche la distance depuis ma position et trie du plus proche au plus lointain", async ({ shopsPage }) => {
    // Position posée à côté de la Librairie des Tilleuls
    await shopsPage.allowPosition(50.6383, 3.0705);
    await shopsPage.loginAsClient(LILLE_ID);
    await shopsPage.goto();
    await shopsPage.useMyPositionButton.click();

    await expect(shopsPage.stopUsingMyPositionButton).toBeVisible();
    await expect(shopsPage.shopCards.nth(0)).toContainText("Librairie des Tilleuls");
    await expect(shopsPage.shopCards.nth(0)).toContainText("à 50 m de vous");
    await expect(shopsPage.shopCards.nth(1)).toContainText("Au Bon Pain");
    await expect(shopsPage.shopCards.nth(1)).toContainText("à 1,1 km de vous");
    // Commerce sans coordonnées : en dernier, sans distance
    await expect(shopsPage.shopCards.nth(2)).toContainText("La Fournée du Moulin");
    await expect(shopsPage.shopCards.nth(2)).not.toContainText("de vous");
});

test("garde la liste sans distances quand l'utilisateur refuse de partager sa position", async ({ shopsPage, browserName }) => {
    test.skip(browserName !== "chromium", "le refus de permission n'est simulable que sur Chromium");
    await shopsPage.loginAsClient(LILLE_ID);
    await shopsPage.goto();
    await shopsPage.useMyPositionButton.click();

    await expect(shopsPage.positionDeniedMessage).toBeVisible();
    await expect(shopsPage.shopCards).toHaveCount(3);
});
