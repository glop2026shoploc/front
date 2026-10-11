import { apiConfig } from "@/shared/config/api";
import type { CatalogueTestInfo } from "./types";

export async function getCatalogueTestInfo(): Promise<CatalogueTestInfo> {
    const response = await fetch(`${apiConfig.catalogue}/test`);

    if (!response.ok) {
        throw new Error(`Catalogue service responded with ${response.status}`);
    }

    return response.json();
}