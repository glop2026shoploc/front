import {AddClient, ClientRegistration} from "@/entities/client/model/types";
import {apiConfig} from "@/shared/config/api";
import {readProblemMessage} from "@/shared/api/problem-detail";
import { apiFetch } from "@/shared/api/fetch";
import { getSession } from "@/entities/user";

export async function registerClient(client: ClientRegistration): Promise<void> {
    const response = await apiFetch(apiConfig.users+"/client/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
            account: {
                firstName: client.firstName,
                lastName : client.lastName,
                email: client.email,
                password: client.password,
                dataUsageConsent: client.dataUsageConsent,
            },
            cityId: client.cityId,
        }, 
        requireAuth: false
    });

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }
}


export async function addClient(client: AddClient): Promise<void> {
    const response = await apiFetch(apiConfig.users+"/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
            cityId: client.cityId,
        },
    });

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }
}