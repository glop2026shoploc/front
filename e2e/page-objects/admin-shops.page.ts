import type { Page } from "@playwright/test";

export class AdminShopsPage {
    constructor(private readonly page: Page) {}

    async goto() {
        await this.page.goto("/admin");
    }

    shopCard(name: string) {
        return this.page.locator('[data-slot="card"]').filter({ hasText: name });
    }

    async accept(name: string) {
        await this.shopCard(name).getByRole("button", { name: "Accepter" }).click();
    }
}
