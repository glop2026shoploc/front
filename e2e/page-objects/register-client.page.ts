import type { Locator, Page } from "@playwright/test";

export interface ClientFormData {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    password: string;
}

export class RegisterClientPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly citySelect: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly consentCheckbox: Locator;
    readonly submitButton: Locator;
    readonly successAlert: Locator;
    readonly shopkeeperTab: Locator;

    constructor(private readonly page: Page) {
        this.firstNameInput = page.getByLabel("Prénom", { exact: true });
        this.lastNameInput = page.getByLabel("Nom", { exact: true });
        this.citySelect = page.getByLabel("Ville", { exact: true });
        this.emailInput = page.getByLabel("Adresse e-mail", { exact: true });
        this.passwordInput = page.getByLabel("Mot de passe", { exact: true });
        this.consentCheckbox = page.getByRole("checkbox");
        this.submitButton = page.getByRole("button", { name: "Créer mon compte client" });
        this.successAlert = page.getByText("Compte créé avec succès");
        this.shopkeeperTab = page.getByRole("link", { name: "Commerçant" });
    }

    async goto() {
        await this.page.goto("/registration?role=client");
        // Attendre l'hydratation React : remplir un input contrôlé avant fait perdre la valeur (vu sur WebKit)
        await this.page.waitForFunction(() => {
            const form = document.querySelector("form");
            return !!form && Object.keys(form).some((key) => key.startsWith("__reactFiber"));
        });
    }

    async fill(data: ClientFormData) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.citySelect.click();
        await this.page.getByRole("option", { name: data.city }).click();
        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);
    }

    async acceptConsent() {
        await this.consentCheckbox.click();
    }

    async submit() {
        await this.submitButton.click();
    }

    message(text: string) {
        return this.page.getByText(text);
    }
}