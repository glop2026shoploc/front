import { apiConfig } from "@/shared/config/api";
import { apiFetch } from "@/shared/api/fetch";
import type { Shop } from "./types";

interface CatalogueShop extends Omit<Shop, "categoryIds"> {
    categoryIds?: string[];
    category?: { categoryId: string };
}

/** Commerces validés de la ville donnée, triés par nom. */
export async function getShopsByCity(cityId: string): Promise<Shop[]> {
    const response = await apiFetch(`${apiConfig.catalogue}/shops?cityId=${encodeURIComponent(cityId)}`);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargement des commerçants : ${response.status}`);
    }

    const shops: CatalogueShop[] = await response.json();
    return shops.map((shop) => ({
        ...shop,
        categoryIds: shop.categoryIds ?? (shop.category ? [shop.category.categoryId] : []),
    }));
}
