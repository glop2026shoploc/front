import { test, expect } from "../fixtures";
import type { ShopkeeperFormData } from "../page-objects/register-shopkeeper.page";

const shopkeeper: ShopkeeperFormData = {
    firstName: "Marie",
    lastName: "Dupont",
    companyName: "MonCommercant",
    address: "12 rue de la République",
    city: "Lille",
    category: "Café",
    siret: "12345678900013",
    email: "nouveau.commercant@example.com",
    password: "AStrongPassword123!",
};

test("affiche la confirmation après une inscription valide", async ({ registerShopkeeperPage }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill(shopkeeper);
    await registerShopkeeperPage.acceptConsent();
    await registerShopkeeperPage.submit();

    await expect(registerShopkeeperPage.successAlert).toBeVisible();
});

test("affiche le message du backend quand l'e-mail est déjà utilisé", async ({ registerShopkeeperPage }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill({ ...shopkeeper, email: "deja.inscrit@example.com" });
    await registerShopkeeperPage.acceptConsent();
    await registerShopkeeperPage.submit();

    await expect(registerShopkeeperPage.message("Un compte existe déjà avec cet e-mail.")).toBeVisible();
});

test("refuse l'inscription sans consentement", async ({ registerShopkeeperPage }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill(shopkeeper);
    await registerShopkeeperPage.submit();

    await expect(
        registerShopkeeperPage.message("Vous devez accepter l'utilisation de vos données personnelles pour créer un compte.")
    ).toBeVisible();
});