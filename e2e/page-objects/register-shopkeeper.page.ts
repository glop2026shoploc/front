import type { Locator, Page } from "@playwright/test";

export interface ShopkeeperFormData {
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    city: string;
    category: string;
    siret: string;
    email: string;
    password: string;
}

export class RegisterShopkeeperPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyNameInput: Locator;
    readonly addressInput: Locator;
    readonly citySelect: Locator;
    readonly categorySelect: Locator;
    readonly siretInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly consentCheckbox: Locator;
    readonly submitButton: Locator;
    readonly successAlert: Locator;
    readonly addressLocatedHint: Locator;

    constructor(private readonly page: Page) {
        this.firstNameInput = page.getByLabel("Prénom", { exact: true });
        this.lastNameInput = page.getByLabel("Nom", { exact: true });
        this.companyNameInput = page.getByLabel("Raison sociale", { exact: true });
        this.addressInput = page.getByLabel("Adresse postale", { exact: true });
        this.citySelect = page.getByLabel("Ville", { exact: true });
        this.categorySelect = page.getByLabel("Catégorie", { exact: true });
        this.siretInput = page.getByLabel("N° SIRET", { exact: true });
        this.emailInput = page.getByLabel("E-mail", { exact: true });
        this.passwordInput = page.getByLabel("Mot de passe", { exact: true });
        this.consentCheckbox = page.getByRole("checkbox");
        this.submitButton = page.getByRole("button", { name: "S'inscrire" });
        this.successAlert = page.getByText("Inscription envoyée");
        this.addressLocatedHint = page.getByText("Adresse localisée", { exact: false });
    }

    async goto() {
        await this.page.goto("/registration?role=shopkeeper");
        // Attendre l'hydratation React : remplir un input contrôlé avant fait perdre la valeur (vu sur WebKit)
        await this.page.waitForFunction(() => {
            const form = document.querySelector("form");
            return !!form && Object.keys(form).some((key) => key.startsWith("__reactFiber"));
        });
    }

    async fill(data: ShopkeeperFormData) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.companyNameInput.fill(data.companyName);
        await this.addressInput.fill(data.address);
        await this.citySelect.click();
        await this.page.getByRole("option", { name: data.city }).click();
        await this.categorySelect.click();
        await this.page.getByRole("option", { name: data.category }).click();
        await this.siretInput.fill(data.siret);
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

    /** Simule la réponse de l'API d'adresses de l'IGN (Géoplateforme) avec une seule adresse. */
    async mockAddressApi(address: { label: string; housenumber: string; street: string; city: string; longitude: number; latitude: number }) {
        await this.page.route("https://data.geopf.fr/geocodage/search?**", (route) =>
            route.fulfill({
                json: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            geometry: { type: "Point", coordinates: [address.longitude, address.latitude] },
                            properties: { ...address, name: `${address.housenumber} ${address.street}`, postcode: "59000" },
                        },
                    ],
                },
            })
        );
    }

    async chooseAddressSuggestion(text: string, suggestion: string) {
        await this.addressInput.fill(text);
        await this.page.getByRole("option", { name: suggestion }).click();
    }
}
