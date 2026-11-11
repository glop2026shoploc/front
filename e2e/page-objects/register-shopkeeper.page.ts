import type { Locator, Page } from "@playwright/test";

export class RegisterShopkeeperPage {
    readonly companyNameInput: Locator;
    readonly categorySelect: Locator;
    readonly siretInput: Locator;
    readonly addressInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly successAlert: Locator;
    readonly errorAlert: Locator;

    constructor(private readonly page: Page) {
        this.companyNameInput = page.getByLabel("Raison sociale");
        this.categorySelect = page.getByLabel("Catégorie");
        this.siretInput = page.getByLabel("N° SIRET");
        this.addressInput = page.getByLabel("Adresse postale");
        this.emailInput = page.getByLabel("E-mail");
        this.passwordInput = page.getByLabel("Mot de passe");
        this.submitButton = page.getByRole("button", { name: "S'inscrire" });
        this.successAlert = page.getByText("Inscription envoyée");
        this.errorAlert = page.getByText("Impossible de finaliser l'inscription", { exact: false });
    }

    async goto() {
        await this.page.goto("/register-shopkeeper");
        // Permettre au webkit de passer les tests en utilisant ses states quand React se branche sur HTML
        await this.page.waitForFunction(() => {
            const form = document.querySelector("form");
            return !!form && Object.keys(form).some((key) => key.startsWith("__reactFiber"));
        });
    }

    async fill(data: {
        companyName: string;
        category: string;
        siret: string;
        address: string;
        email: string;
        password: string;
    }) {
        await this.companyNameInput.fill(data.companyName);
        await this.categorySelect.click();
        await this.page.getByRole("option", { name: data.category }).click();
        await this.siretInput.fill(data.siret);
        await this.addressInput.fill(data.address);
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
    }

    async submit() {
        await this.submitButton.click();
    }
}