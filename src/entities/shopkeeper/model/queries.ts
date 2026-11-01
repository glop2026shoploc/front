import { apiConfig } from "@/shared/config/api";
import type { ShopkeeperInfo, ShopkeeperRegistration } from "./types";

export async function registerShopkeeper(shopkeeper: ShopkeeperRegistration): Promise<ShopkeeperInfo> {
    const response = await fetch(`${apiConfig.users}/api/users/shopkeeper/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopkeeper),
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l'inscription ${response.status}`);
    }

    return response.json();
}