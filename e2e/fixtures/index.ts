import { test as base, expect } from "@playwright/test";
import { CatalogueTestPage } from "../page-objects/catalogue-test.page";

type Fixtures = {
    catalogueTestPage: CatalogueTestPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route("https://picsum.photos/**", (route) => route.abort());
        await use(page);
    },
    catalogueTestPage: async ({ page }, use) => use(new CatalogueTestPage(page)),
});

export { expect };