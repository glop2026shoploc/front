import {ClientRegistration} from "@/entities/client/model/types";
import {apiConfig} from "@/shared/config/api";
import {readProblemMessage} from "@/shared/api/problem-detail";
import { apiFetch } from "@/shared/api/fetch";
import { getSession } from "@/entities/user";

export async function registerClient(client: ClientRegistration): Promise<void> {
    const url = apiConfig.users+"/client" +(await getSession() ? "":"/register")
    const response = await apiFetch(url, {
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
    });

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }
}