import { apiConfig } from "@/shared/config/api";
import type { TokenResponse, ShopkeeperRegistration, AddShopKeeper } from "./types";
import {readProblemMessage} from "@/shared/api/problem-detail";
import { apiFetch } from "@/shared/api/fetch";
import { getSession } from "@/entities/user";

export async function registerShopkeeper(shopkeeper: ShopkeeperRegistration): Promise<TokenResponse> {
    const response = await apiFetch(apiConfig.users+"/shopkeeper/register", {
        method: "POST",
        body: {
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
    }});

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }

    return response.json();
}

export async function addShopkeeper(shopkeeper: AddShopKeeper): Promise<TokenResponse> {
    const response = await apiFetch(apiConfig.users+"/shopkeeper", {
        method: "POST",
        body: {
            companyName: shopkeeper.companyName,
            categoryId: shopkeeper.categoryId,
            siret: shopkeeper.siret,
            address: {
                road: shopkeeper.address,
                cityId: shopkeeper.cityId,
            },
    }});

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }

    return response.json();
}