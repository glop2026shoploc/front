import { apiConfig } from "@/shared/config/api";
import type { ShopkeeperInfo, ShopkeeperRegistration } from "./types";
import {readProblemMessage} from "@/shared/api/problem-detail";

export async function registerShopkeeper(shopkeeper: ShopkeeperRegistration): Promise<ShopkeeperInfo> {
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