import { apiConfig } from "@/shared/config/api";
import { Credentials, Role, TokenResponse } from "./types";


export async function login(credentials: Credentials, role: Role): Promise<TokenResponse> {
    const response:Response = await fetch(`${apiConfig.users}/auth/login`, 
        {method: "POST", 
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({...credentials,role:role})
        }
    )
    console.log(response);
    if(!response.ok)throw new Error("Email ou mot de passe incorrect");

    return response.json();
}