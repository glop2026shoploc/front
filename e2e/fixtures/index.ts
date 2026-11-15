import { test as base, expect } from "@playwright/test";
import { CatalogueTestPage } from "../page-objects/catalogue-test.page";
import {RegisterShopkeeperPage} from "../page-objects/register-shopkeeper.page";
import {RegisterClientPage} from "../page-objects/register-client.page";
import {AdminShopsPage} from "../page-objects/admin-shops.page";

type Fixtures = {
    catalogueTestPage: CatalogueTestPage;
    registerShopkeeperPage: RegisterShopkeeperPage;
    registerClientPage: RegisterClientPage;
    adminShopsPage: AdminShopsPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route("https://picsum.photos/**", (route) => route.abort());
        await use(page);
    },
    catalogueTestPage: async ({ page }, use) => use(new CatalogueTestPage(page)),
    registerShopkeeperPage: async ({ page }, use) => use(new RegisterShopkeeperPage(page)),
    registerClientPage: async ({ page }, use) => use(new RegisterClientPage(page)),
    adminShopsPage: async ({ page }, use) => use(new AdminShopsPage(page)),
});

export { expect };