"use server";

import {registerShopkeeper, ShopkeeperRegistration, uploadShopkeeperDocument} from "@/entities/shopkeeper";
import {validationMessages} from "@/shared/lib/validations";

export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(
    Shopkeeper: ShopkeeperRegistration,
    documents: FormData
): Promise<RegisterShopkeeperResult> {
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

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const files: File[] = [];
    for (const entry of documents.getAll("documents")) {
        if (!(entry instanceof File) || !allowedTypes.includes(entry.type)) {
            return { success: false, message: "Les pièces justificatives doivent être des fichiers PDF, JPEG ou PNG." };
        }
        files.push(entry);
    }

    if (files.length === 0) {
        return { success: false, message: "Ajoutez au moins une pièce justificative." };
    }

    let shopkeeperId: number;
    try {
        const shopkeeper = await registerShopkeeper(Shopkeeper);
        shopkeeperId = shopkeeper.shopkeeperId;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Impossible de finaliser l'inscription.",
        };
    }

    try {
        for (const file of files) {
            await uploadShopkeeperDocument(shopkeeperId, file);
        }
    } catch {
        return {
            success: false,
            message: "Votre inscription est enregistrée mais les pièces justificatives n'ont pas pu être envoyées. Contactez l'administrateur.",
        };
    }

    return { success: true };
}