import { apiConfig } from "@/shared/config/api";
import type { CatalogueTestInfo } from "./types";

export async function getCatalogueTestInfo(): Promise<CatalogueTestInfo> {
    const response = await fetch(`${apiConfig.catalogue}/api/catalogue/test`);

    if (!response.ok) {
        throw new Error(`Catalogue service responded with ${response.status}`);
    }

    return response.json();
}

export async function updateCatalogueMessage(message: string): Promise<CatalogueTestInfo> {
    const response = await fetch(`${apiConfig.catalogue}/api/catalogue/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi vers le service Catalogue ${response.status}`);
    }

    return response.json();
}
