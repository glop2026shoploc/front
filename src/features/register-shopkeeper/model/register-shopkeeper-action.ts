"use server";

import {registerShopkeeper, ShopkeeperRegistration} from "@/entities/shopkeeper";
import {isValidPostalCode, validationMessages} from "@/shared/lib/validations";

export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(Shopkeeper: ShopkeeperRegistration, dataUsageConsent: boolean): Promise<RegisterShopkeeperResult> {
    const { companyName, category, siret, address, postalCode, city, email, password } = Shopkeeper;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

    if (!companyName.trim() || !category.trim() || !siret.trim() || !address.trim() || !postalCode.trim() || !city.trim() || !email.trim() || !password.trim()) {
        return { success: false, message: validationMessages.allFieldsRequired };
    }

    if (!isValidPostalCode(postalCode)) {
        return { success: false, message: validationMessages.postalCodeFormat };
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