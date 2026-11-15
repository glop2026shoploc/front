import { test, expect } from "../fixtures";

const SHOP_TO_ACCEPT = "00000000-0000-0000-0000-00000000000b";

test.afterEach(async ({ request }) => {
    // Remet le commerce en attente dans le mock pour les tests suivants
    await request.patch(`http://localhost:4100/api/catalogue/shops/admin/${SHOP_TO_ACCEPT}/status?status=WAITING`);
});

test("affiche un commerce en attente avec ses pièces justificatives", async ({ adminShopsPage }) => {
    await adminShopsPage.goto();

    const card = adminShopsPage.shopCard("Boulangerie Dupont");
    await expect(card.getByText("SIRET : 12345678900013")).toBeVisible();
    await expect(card.getByRole("link", { name: "Pièce 1" })).toHaveAttribute(
        "href",
        "http://localhost:4100/files/00000000-0000-0000-0000-00000000000a/kbis.pdf"
    );
});

test("retire le commerce de la liste après l'avoir accepté", async ({ adminShopsPage }) => {
    await adminShopsPage.goto();
    await adminShopsPage.accept("Fleuriste Martin");

    await expect(adminShopsPage.shopCard("Fleuriste Martin")).toHaveCount(0);
});
