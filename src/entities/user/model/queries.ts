import { apiConfig } from "@/shared/config/api";
import { Credentials, Role, TokenResponse } from "./types";
import { apiFetch } from "@/shared/api/fetch";


export async function login(credentials: Credentials, role: Role): Promise<TokenResponse> {
    const response:Response = await apiFetch(`${apiConfig.users}/auth/login`, 
        {method: "POST", 
            body: {...credentials,role:role}
        }
    )
    console.log(response);
    if(!response.ok)throw new Error("Email ou mot de passe incorrect");

    return response.json();
}