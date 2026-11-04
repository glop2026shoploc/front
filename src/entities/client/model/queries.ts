import {ClientRegistration} from "@/entities/client/model/types";
import {apiConfig} from "@/shared/config/api";

export async function registerClient(client: ClientRegistration): Promise<void> {
    const response = await fetch(`${apiConfig.gateway}/api/users/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
    });

    if (!response.ok) {
        throw new Error(await "Erreur lors de l'inscription.");
    }
}