import { apiConfig } from "@/shared/config/api";
import type { Product } from "./types";

export async function getShopProducts(shopId: string): Promise<Product[]> {
    const response = await fetch(`${apiConfig.catalogue}/api/catalogue/shops/${shopId}/products`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des produits ${response.status}`);
    }

    return response.json();
}
