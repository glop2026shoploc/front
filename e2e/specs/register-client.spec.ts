import { test, expect } from "../fixtures";
import type { ClientFormData } from "../page-objects/register-client.page";

const client: ClientFormData = {
    firstName: "Jean",
    lastName: "Martin",
    city: "Lille",
    email: "nouveau.client@example.com",
    password: "AStrongPassword123!",
};

test("affiche la confirmation après une inscription valide", async ({ registerClientPage }) => {
    await registerClientPage.goto();
    await registerClientPage.fill(client);
    await registerClientPage.acceptConsent();
    await registerClientPage.submit();

    await expect(registerClientPage.successAlert).toBeVisible();
});

test("affiche le message du backend quand l'e-mail est déjà utilisé", async ({ registerClientPage }) => {
    await registerClientPage.goto();
    await registerClientPage.fill({ ...client, email: "deja.inscrit@example.com" });
    await registerClientPage.acceptConsent();
    await registerClientPage.submit();

    await expect(registerClientPage.message("Un compte existe déjà avec cet e-mail.")).toBeVisible();
});

test("la bascule mène au formulaire commerçant", async ({ registerClientPage, page }) => {
    await registerClientPage.goto();
    await registerClientPage.shopkeeperTab.click();

    await expect(page).toHaveURL(/role=shopkeeper/);
    await expect(page.getByLabel("Raison sociale", { exact: true })).toBeVisible();
});