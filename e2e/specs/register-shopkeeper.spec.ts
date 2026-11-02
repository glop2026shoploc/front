import { test, expect } from "../fixtures";

const EMAIL = "moncommercant@example.com";

test("affiche un message de confirmation après une inscription valide", async ({ registerShopkeeperPage }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill({
        companyName: "MonCommercant",
        category: "Alimentation",
        siret: `${Date.now()}`.padStart(14, "0"),
        address: "12 rue de la Republique, 59000 Lille",
        email: `shopkeeper-${Date.now()}@test.fr`,
        password: "AStrongPassword123!",
    });
    await registerShopkeeperPage.addDocument("kbis.pdf", "application/pdf", 1000);

    await registerShopkeeperPage.submit();

    await expect(registerShopkeeperPage.successAlert).toBeVisible();
});

test("affiche une erreur quand l'e-mail est déjà utilisé", async ({ registerShopkeeperPage }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill({
        companyName: "MonCommercant",
        category: "Alimentation",
        siret: "12345678900013",
        address: "12 rue de la Republique, 59000 Lille",
        email: EMAIL,
        password: "AStrongPassword123!",
    });
    await registerShopkeeperPage.addDocument("kbis.pdf", "application/pdf", 1000);

    await registerShopkeeperPage.submit();

    await expect(registerShopkeeperPage.errorAlert).toBeVisible();
});

test("affiche une erreur quand les pièces justificatives dépassent 4 Mo", async ({ registerShopkeeperPage, page }) => {
    await registerShopkeeperPage.goto();
    await registerShopkeeperPage.fill({
        companyName: "MonCommercant",
        category: "Alimentation",
        siret: `${Date.now()}`.padStart(14, "0"),
        address: "12 rue de la Republique, 59000 Lille",
        email: `shopkeeper-${Date.now()}@test.fr`,
        password: "AStrongPassword123!",
    });
    await registerShopkeeperPage.addDocument("kbis.pdf", "application/pdf", 5 * 1024 * 1024);

    await registerShopkeeperPage.submit();

    await expect(page.getByText("ne doivent pas dépasser 4 Mo")).toBeVisible();
});
