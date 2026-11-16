import {ClientRegistration} from "@/entities/client/model/types";
import {apiConfig} from "@/shared/config/api";
import {readProblemMessage} from "@/shared/api/problem-detail";

export async function registerClient(client: ClientRegistration): Promise<void> {
    const response = await fetch(`${apiConfig.users}/api/users/client/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            account: {
                firstName: client.firstName,
                lastName : client.lastName,
                email: client.email,
                password: client.password,
                dataUsageConsent: client.dataUsageConsent,
            },
            cityId: client.cityId,
        }),
    });

    if (!response.ok) {
        throw new Error(await readProblemMessage(response, "Erreur lors de l'inscription."));
    }
}