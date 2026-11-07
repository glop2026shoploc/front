"use server";

import {registerShopkeeper, ShopkeeperRegistration} from "@/entities/shopkeeper";
import {validationMessages} from "@/shared/lib/validations";

export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(Shopkeeper: ShopkeeperRegistration): Promise<RegisterShopkeeperResult> {
    const { firstName, lastName, companyName, categoryId, siret, address, cityId, email, password, dataUsageConsent } = Shopkeeper;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

    if (!firstName.trim() || !lastName.trim() || !companyName.trim() || !categoryId ||
        !siret.trim() || !address.trim() || !cityId || !email.trim() || !password.trim()) {
        return { success: false, message: validationMessages.allFieldsRequired };
    }

    if (!email.match(emailPattern)) {
        return { success: false, message: validationMessages.emailFormat };
    }

    if (!password.match(passwordPattern)) {
        return { success: false, message: validationMessages.passwordStrength };
    }

    if (!dataUsageConsent) {
        return { success: false, message: validationMessages.consentRequired };
    }
    // try {
    //     await registerShopkeeper(Shopkeeper);
    //     return { success: true };
    // } catch (error){
    //     return {
    //         success: false,
    //         message: "Impossible de finaliser l'inscription. Vérifiez vos informations (email ou SIRET peut-être déjà utilisé).",
    //     };
    // }
    try {
        await registerShopkeeper(Shopkeeper);
        return { success: true };
    } catch (error) {
        console.error("Inscription commerçant échouée :", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Impossible de finaliser l'inscription.",
        };
    }
}