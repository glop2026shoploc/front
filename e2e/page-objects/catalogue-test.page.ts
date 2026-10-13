import type { Locator, Page } from "@playwright/test";

export class CatalogueTestPage {
    readonly message: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;

    constructor(private readonly page: Page) {
        this.message = page.getByText("Message de test depuis la base", { exact: true });
        this.messageInput = page.getByRole("textbox", { name: "Nouveau message du service catalogue" });
        this.submitButton = page.getByRole("button", { name: "Envoyer" });
    }

    async goto() {
        await this.page.goto("/test");
    }

    async submitMessage(message: string) {
        await this.messageInput.fill(message);
        await this.submitButton.click();
    }

    messageText(value: string) {
        return this.page.getByText(value, { exact: true });
    }
}
