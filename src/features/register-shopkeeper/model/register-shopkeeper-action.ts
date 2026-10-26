"use server";

import {registerShopkeeper, ShopkeeperRegistration} from "@/entities/shopkeeper";
export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(
    Shopkeeper: ShopkeeperRegistration
): Promise<RegisterShopkeeperResult> {
    const { companyName, category, siret, address, email, password } = Shopkeeper;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

    if (!companyName.trim() || !category.trim() || !siret.trim() || !address.trim() || !email.trim() || !password.trim()) {
        return { success: false, message: "Tous les champs sont obligatoires." };
    }

    if (!email.match(emailPattern)) {
        return { success: false, message: "Le format de l'e-mail n'est pas valide."};
    }

    if (!password.match(emailPattern)) {
        return { success: false, message: "Le mot de passe doit contenir au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial."};
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