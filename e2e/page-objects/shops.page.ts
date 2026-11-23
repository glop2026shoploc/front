import type { Locator, Page } from "@playwright/test";

// Mêmes ids que les données de test du service users ; le mock catalogue n'a des commerces qu'à Lille.
export const LILLE_ID = "00000000-0000-0000-0000-000000000102";
export const VILLE_SANS_COMMERCE_ID = "00000000-0000-0000-0000-000000000101";

export class ShopsPage {
    readonly shopCards: Locator;
    readonly clientsOnlyAlert: Locator;
    readonly useMyPositionButton: Locator;
    readonly stopUsingMyPositionButton: Locator;
    readonly positionDeniedMessage: Locator;

    constructor(readonly page: Page) {
        this.shopCards = page.getByTestId("shop-card");
        this.clientsOnlyAlert = page.getByText("Page réservée aux clients");
        this.useMyPositionButton = page.getByRole("button", { name: "Utiliser ma position" });
        this.stopUsingMyPositionButton = page.getByRole("button", { name: "Ne plus utiliser ma position" });
        this.positionDeniedMessage = page.getByText("Vous avez refusé le partage de votre position", { exact: false });
    }

    async goto() {
        await this.page.goto("/commercants");
    }

    /** Simule un client connecté avec la ville donnée. */
    async loginAsClient(cityId: string) {
        await this.login({ role: "CLIENT", cityId });
    }

    async loginAsMerchant() {
        await this.login({ role: "MERCHANT" });
    }

    private async login(claims: { role: string; cityId?: string }) {
        const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
        await this.page.context().addCookies([
            { name: "token", value: `header.${payload}.signature`, url: "http://localhost:3000" },
        ]);
    }

    /** L'utilisateur accepte la demande de position du navigateur*/
    async allowPosition(latitude: number, longitude: number) {
        await this.page.context().grantPermissions(["geolocation"]);
        await this.page.context().setGeolocation({ latitude, longitude });
    }

    shopCard(name: string) {
        return this.shopCards.filter({ hasText: name });
    }
}
