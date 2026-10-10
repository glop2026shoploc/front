import type { Locator, Page } from "@playwright/test";

export class CatalogueTestPage {
    readonly message: Locator;

    constructor(private readonly page: Page) {
        this.message = page.getByText("Message de test depuis la base", { exact: true });
    }

    async goto() {
        await this.page.goto("/test");
    }
}
