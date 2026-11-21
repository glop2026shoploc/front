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

export async function getWaitingShops(): Promise<Shop[]> {
    const response = await fetch(`${apiConfig.catalogue}/shops/admin/waiting`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des commerces en attente ${response.status}`);
    }

    return response.json();
}

export async function getShopDocumentUrls(shopId: string): Promise<string[]> {
    const response = await fetch(`${apiConfig.catalogue}/shops/admin/${shopId}/documents`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des pièces justificatives ${response.status}`);
    }

    return response.json();
}

export async function updateShopStatus(shopId: string, status: "VALIDATED" | "REJECTED"): Promise<void> {
    const response = await fetch(`${apiConfig.catalogue}/shops/admin/${shopId}/status?status=${status}`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error(`Erreur lors du changement de statut ${response.status}`);
    }
}
