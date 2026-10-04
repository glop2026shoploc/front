import type { Locator, Page } from "@playwright/test";

export class ArtistDetailPage {
    readonly albumsSection: Locator;
    readonly tracksSection: Locator;
    readonly trackRows: Locator;

    constructor(private readonly page: Page) {
        this.albumsSection = page
            .locator("section")
            .filter({ has: page.getByRole("heading", { name: "Albums" }) });
        this.tracksSection = page
            .locator("section")
            .filter({ has: page.getByRole("heading", { name: "Tous les titres" }) });
        this.trackRows = this.tracksSection.locator("tbody").getByRole("row");
    }

    async goto(artistId: string) {
        await this.page.goto(`/artists/${artistId}`);
    }

    heading(name: string) {
        return this.page.getByRole("heading", { level: 1, name });
    }
}