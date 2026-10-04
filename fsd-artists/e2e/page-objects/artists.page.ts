import type { Locator, Page } from "@playwright/test";

export class ArtistsPage {
    readonly heading: Locator;
    readonly searchInput: Locator;
    readonly artistLinks: Locator;
    readonly emptyMessage: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole("heading", { level: 1, name: "Artistes" });
        this.searchInput = page.getByRole("searchbox", { name: "Rechercher un artiste" });
        this.artistLinks = page.getByRole("main").getByRole("link");
        this.emptyMessage = page.getByText("Aucun artiste ne correspond");
    }

    async goto() {
        await this.page.goto("/artists");
    }

    async search(query: string) {
        await this.searchInput.fill(query);
    }

    artistLink(name: string) {
        return this.artistLinks.filter({ hasText: name });
    }
}