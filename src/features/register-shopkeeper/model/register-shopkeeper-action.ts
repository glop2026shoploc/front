"use server";

import {registerShopkeeper, ShopkeeperRegistration, uploadShopkeeperDocument} from "@/entities/shopkeeper";
export type RegisterShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function registerShopkeeperAction(
    Shopkeeper: ShopkeeperRegistration,
    documents: FormData
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

    if (!password.match(passwordPattern)) {
        return { success: false, message: "Le mot de passe doit contenir au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial."};
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
    } catch (error){
        return {
            success: false,
            message: "Impossible de finaliser l'inscription. Vérifiez vos informations (email ou SIRET peut-être déjà utilisé).",
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