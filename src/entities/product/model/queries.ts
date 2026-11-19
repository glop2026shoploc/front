import { apiConfig } from "@/shared/config/api";
import type { Product } from "./types";
import { apiFetch } from "@/shared/api/fetch";

export async function getShopProducts(shopId: string): Promise<Product[]> {
    const response = await apiFetch(`${apiConfig.catalogue}/shops/${shopId}/products`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des produits ${response.status}`);
    }

    return response.json();
}
