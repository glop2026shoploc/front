"use server";
import { registerClient, type ClientRegistration } from "@/entities/client";
import {isStrongPassword, isValidEmail, validationMessages} from "@/shared/lib/validations";

export type RegisterClientResult =
    | { success: true }
    | { success: false; message: string };

export async function submitClientRegistration(client: ClientRegistration): Promise<RegisterClientResult> {
    const { firstName, lastName, cityId, password, dataUsageConsent } = client;
    const email = client.email.trim().toLowerCase();

    if (!firstName.trim() || !lastName.trim() || !cityId || !email || !password.trim()) {
        return { success: false, message: validationMessages.allFieldsRequired };
    }

    if (!isValidEmail(email)) {
        return { success: false, message: validationMessages.emailFormat };
    }

    if (!isStrongPassword(password)) {
        return { success: false, message: validationMessages.passwordStrength };
    }

    if (!dataUsageConsent) {
        return { success: false, message: validationMessages.consentRequired };
    }

    try {
        await registerClient({ ...client, email });
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Une erreur est survenue.",
        };
    }
}