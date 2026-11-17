import { apiConfig } from "@/shared/config/api";
import type { Category } from "./types";

interface CatalogueCategory {
    categoryId: string;
    name: string;
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${apiConfig.catalogue}/api/catalogue/categories`);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargemement des catégories : ${response.status}`);
    }

    const categories: CatalogueCategory[] = await response.json();
    return categories.map(({ categoryId, name }) => ({ id: categoryId, name }));
}
