"use server";
import { AddClient, addClient, type ClientRegistration } from "@/entities/client";
import {validationMessages} from "@/shared/lib/validations";

export type AddClientResult =
    | { success: true }
    | { success: false; message: string };

export async function submitAddClient(client: AddClient): Promise<AddClientResult> {
    const { cityId} = client;
   
    if (!cityId ) {
        return { success: false, message: validationMessages.allFieldsRequired };
    }


    try {
        await addClient(client);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Une erreur est survenue.",
        };
    }
}