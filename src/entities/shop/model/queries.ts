import { apiConfig } from "@/shared/config/api";
import { apiFetch } from "@/shared/api/fetch";
import type { Shop } from "./types";

/** Commerces validés de la ville donnée, triés par nom. */
export async function getShopsByCity(cityId: string): Promise<Shop[]> {
    const response = await apiFetch(`${apiConfig.catalogue}/shops?cityId=${encodeURIComponent(cityId)}`);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargement des commerçants : ${response.status}`);
    }

    return response.json();
}
