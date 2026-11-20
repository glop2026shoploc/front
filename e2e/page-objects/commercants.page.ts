import type { Locator, Page } from "@playwright/test";

export class CommercantsPage {
    readonly categorySelect: Locator;
    readonly cards: Locator;
    readonly emptyMessage: Locator;
    readonly pendingShopName: Locator;

    constructor(private readonly page: Page) {
        this.categorySelect = page.getByLabel("Catégorie");
        this.cards = page.getByRole("listitem");
        this.emptyMessage = page.getByRole("status");
        this.pendingShopName = page.getByText("Shop en attente");
    }

    async goto() {
        await this.page.goto("/commercants");
    }

    async filterBy(category: string) {
        if (category === "Toutes") {
            await this.categorySelect.selectOption("");
        } else {
            await this.categorySelect.selectOption({ label: category });
        }
    }
}
