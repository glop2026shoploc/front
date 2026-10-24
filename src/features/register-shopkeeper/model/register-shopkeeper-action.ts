"use server";

import {registerShopkeeper, ShopkeeperRegistration} from "@/entities/shopkeeper";
export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(
    Shopkeeper: ShopkeeperRegistration
): Promise<RegisterShopkeeperResult> {
    const { companyName, category, siret, address, email, password } = Shopkeeper;

    if (!companyName.trim() || !category.trim() || !siret.trim() || !address.trim() || !email.trim() || !password.trim()) {
        return { success: false, message: "Tous les champs sont obligatoires." };
    }

    try {
        await registerShopkeeper(Shopkeeper);
        return { success: true };
    } catch (error){
        return {
            success: false,
            message: "Impossible de finaliser l'inscription. Vérifiez vos informations (email ou SIRET peut-être déjà utilisé).",
        };
    }
}