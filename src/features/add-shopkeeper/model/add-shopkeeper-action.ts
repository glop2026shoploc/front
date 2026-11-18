"use server";

import {addShopkeeper, AddShopKeeper} from "@/entities/shopkeeper";
import {validationMessages} from "@/shared/lib/validations";

export type AddShopkeeperResult =
    | { success: true }
    | { success: false; message: string };

export async function addShopkeeperAction(Shopkeeper: AddShopKeeper): Promise<AddShopkeeperResult> {
    const {  companyName, categoryId, siret, address, cityId } = Shopkeeper;
    
    if (!companyName.trim() || !categoryId ||
        !siret.trim() || !address.trim() || !cityId ) {
        return { success: false, message: validationMessages.allFieldsRequired };
    }

    try {
        await addShopkeeper(Shopkeeper);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Impossible de finaliser l'inscription.",
        };
    }
}