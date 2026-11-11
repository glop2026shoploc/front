import type { Locator, Page } from "@playwright/test";

export class CommercantsPage {
    readonly categorySelect: Locator;
    readonly cards: Locator;
    readonly emptyMessage: Locator;

    constructor(private readonly page: Page) {
        this.categorySelect = page.getByLabel("Catégorie");
        this.cards = page.getByRole("listitem");
        this.emptyMessage = page.getByRole("status");
    }

    async goto() {
        await this.page.goto("/commercants");
    }

    async filterBy(category: string) {
        await this.categorySelect.selectOption(category);
    }
}
