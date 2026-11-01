import { apiConfig } from "@/shared/config/api";
import { Credentials, Inscription, TokenResponse } from "./types";

export async function register(inscription: Inscription): Promise<TokenResponse> {
    const response:Response = await fetch(`${apiConfig.users}/auth/register`, 
        {method: "POST", 
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(inscription)
        }
    )
    console.log(response);
    if(!response.ok)throw new Error();

    return response.json();
}


export async function login(credentials: Credentials): Promise<TokenResponse> {
    const response:Response = await fetch(`${apiConfig.users}/auth/login`, 
        {method: "POST", 
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(credentials)
        }
    )
    console.log(response);
    if(!response.ok)throw new Error();

    return response.json();
}