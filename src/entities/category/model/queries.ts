import { apiConfig } from "@/shared/config/api";
import type { Category } from "./types";

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${apiConfig.gateway}/api/users/categories`);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargemement des catégories : ${response.status}`);
    }

    return response.json();
}