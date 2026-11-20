import { apiConfig } from "@/shared/config/api";
import type { CategorieCommercant, Commercant } from "../model/types";

export async function getCommercants(categoryId?: string): Promise<Commercant[]> {
    let url = `${apiConfig.gateway}/api/catalogue/shops`;
    if (categoryId) {
        url += `?categoryId=${encodeURIComponent(categoryId)}`;
    }

    const response = await fetch(url, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Catalogue a répondu avec le statut ${response.status}.`);
    }

    return response.json();
}

export async function getCategoriesCommercants(): Promise<CategorieCommercant[]> {
    const response = await fetch(`${apiConfig.gateway}/api/catalogue/categories`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Catalogue a répondu avec le statut ${response.status}.`);
    }

    return response.json();
}

