import type { Locator, Page } from "@playwright/test";

export class CommercantsPage {
    readonly categorySelect: Locator;
    readonly cards: Locator;
    readonly emptyMessage: Locator;
    readonly pendingShopName: Locator;

    constructor(private readonly page: Page) {
        this.categorySelect = page.getByLabel("Catégorie");
        this.cards = page.getByTestId("shop-card");
        this.emptyMessage = page.getByText("Aucun commerçant trouvé", { exact: true });
        this.pendingShopName = page.getByText("Shop en attente");
    }

    async goto() {
        const claims = {
            role: "CLIENT",
            cityId: "00000000-0000-0000-0000-000000000102",
        };
        const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
        await this.page.context().addCookies([
            { name: "token", value: `header.${payload}.signature`, url: "http://localhost:3000" },
        ]);
        await this.page.goto("/commercants");
    }

    async filterBy(category: string) {
        if (category === "Toutes") {
            await this.categorySelect.selectOption({ label: "Toutes les catégories" });
        } else {
            await this.categorySelect.selectOption({ label: category });
        }
    }
}
