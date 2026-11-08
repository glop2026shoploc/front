import { apiConfig } from "@/shared/config/api";
import type { Commercant } from "../model/types";

export async function getCommercants(): Promise<Commercant[]> {
    const response = await fetch(`${apiConfig.gateway}/api/catalogue/shopkeepers`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Catalogue a répondu avec le statut ${response.status}.`);
    }

    return response.json();
}

