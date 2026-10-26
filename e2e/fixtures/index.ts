import { test as base, expect } from "@playwright/test";
import { CatalogueTestPage } from "../page-objects/catalogue-test.page";
import {RegisterShopkeeperPage} from "../page-objects/register-shopkeeper.page";

type Fixtures = {
    catalogueTestPage: CatalogueTestPage;
    registerShopkeeperPage: RegisterShopkeeperPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route("https://picsum.photos/**", (route) => route.abort());
        await use(page);
    },
    catalogueTestPage: async ({ page }, use) => use(new CatalogueTestPage(page)),
    registerShopkeeperPage: async ({ page }, use) => use(new RegisterShopkeeperPage(page)),
});

export { expect };