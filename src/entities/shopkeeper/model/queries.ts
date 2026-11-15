import { apiConfig } from "@/shared/config/api";
import type { ShopkeeperRegistration, TokenResponse } from "./types";
import {readProblemMessage} from "@/shared/api/problem-detail";

export async function registerShopkeeper(shopkeeper: ShopkeeperRegistration): Promise<TokenResponse> {
    const response = await fetch(`${apiConfig.users}/api/users/shopkeeper/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            account: {
                email: shopkeeper.email,
                firstName: shopkeeper.firstName,
                lastName: shopkeeper.lastName,
                password: shopkeeper.password,
                dataUsageConsent: shopkeeper.dataUsageConsent,
            },
            companyName: shopkeeper.companyName,
            categoryId: shopkeeper.categoryId,
            siret: shopkeeper.siret,
            address: {
                road: shopkeeper.address,
                cityId: shopkeeper.cityId,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }

    return response.json();
}

export async function uploadShopkeeperDocument(shopId: string, file: File): Promise<void> {
    const body = new FormData();
    body.append("file", file);

    const response = await fetch(`${apiConfig.catalogue}/api/catalogue/shops/${shopId}/documents`, {
        method: "POST",
        body,
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi du justificatif ${response.status}`);
    }
}