import { test as base, expect } from "@playwright/test";
import { ArtistsPage } from "../page-objects/artists.page";
import { ArtistDetailPage } from "../page-objects/artist-detail.page";

type Fixtures = {
    artistsPage: ArtistsPage;
    artistDetailPage: ArtistDetailPage;
};

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await page.route("https://picsum.photos/**", (route) => route.abort());
        await use(page);
    },
    artistsPage: async ({ page }, use) => use(new ArtistsPage(page)),
    artistDetailPage: async ({ page }, use) => use(new ArtistDetailPage(page)),
});

export { expect };