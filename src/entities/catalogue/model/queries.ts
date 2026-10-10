import type { CatalogueTestInfo } from "./types";

const CATALOGUE_API_URL = process.env.CATALOGUE_API_URL ?? "http://localhost:8080";

export async function getCatalogueTestInfo(): Promise<CatalogueTestInfo> {
    const response = await fetch(`${CATALOGUE_API_URL}/test`);

    if (!response.ok) {
        throw new Error(`Catalogue service responded with ${response.status}`);
    }

    return response.json();
}