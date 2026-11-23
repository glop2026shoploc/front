import { test as base, expect } from "@playwright/test";
import { CatalogueTestPage } from "../page-objects/catalogue-test.page";
import { RegisterShopkeeperPage } from "../page-objects/register-shopkeeper.page";
import { RegisterClientPage } from "../page-objects/register-client.page";
import { CommercantsPage } from "../page-objects/commercants.page";
import { ShopsPage } from "../page-objects/shops.page";

type Fixtures = {
    catalogueTestPage: CatalogueTestPage;
    registerShopkeeperPage: RegisterShopkeeperPage;
    registerClientPage: RegisterClientPage;
    commercantsPage: CommercantsPage;
    shopsPage: ShopsPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route("https://picsum.photos/**", (route) => route.abort());
        // Évite d'appeler le vrai service d'adresses pendant les tests E2E.
        await page.route("https://data.geopf.fr/**", (route) => route.abort());
        await use(page);
    },
    catalogueTestPage: async ({ page }, use) => use(new CatalogueTestPage(page)),
    registerShopkeeperPage: async ({ page }, use) => use(new RegisterShopkeeperPage(page)),
    registerClientPage: async ({ page }, use) => use(new RegisterClientPage(page)),
    commercantsPage: async ({ page }, use) => use(new CommercantsPage(page)),
    shopsPage: async ({ page }, use) => use(new ShopsPage(page)),
});

export { expect };
