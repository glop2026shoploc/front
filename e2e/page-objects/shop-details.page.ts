import type { Page } from "@playwright/test";

export class ShopDetailsPage {
    constructor(private readonly page: Page) {}

    async goto(shopId: string) {
        await this.page.goto(`/commercants/${shopId}`);
    }

    text(value: string) {
        return this.page.getByText(value, { exact: true });
    }

    row(name: string) {
        return this.page.getByRole("row").filter({ hasText: name });
    }
}
