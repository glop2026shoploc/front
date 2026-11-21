import { cookies } from "next/headers"
import type { Role } from "./types"
export async function setSession(token:string){
    const exp = getTokenExpiration(token);
    (await cookies()).set("token", token, 
    { httpOnly: true , 

        ...(exp ? { expires: new Date(exp) } : {}),
    })
} 

export async function getSession(): Promise<string|undefined>{
    return ((await cookies()).get("token")?.value);
}

export interface SessionClaims {
    role?: Role;
    cityId?: string;
}

/**
 * Informations du JWT émis par le service users (claims `role` et `cityId`).
 * Undefined si personne n'est connecté.
 */
export async function getSessionClaims(): Promise<SessionClaims | undefined> {
    const payload = (await getSession())?.split(".")[1];
    if (!payload) {
        return undefined;
    }

    try {
        const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Record<string, unknown>;
        return {
            role: typeof claims.role === "string" ? (claims.role as Role) : undefined,
            cityId: typeof claims.cityId === "string" ? claims.cityId : undefined,
        };
    } catch {
        return undefined;
    }
}

export async function clearSession() {
    (await cookies()).delete("token");
    
}

export function isTokenExpired(token: string): boolean {
    const exp = getTokenExpiration(token);
    return exp === undefined || exp <= Date.now();
}

function getTokenExpiration(token: string) {
     try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const { exp } = JSON.parse(atob(payload));
        return typeof exp === "number" ? exp * 1000 : undefined; // en ms
    } catch {
        return undefined;
    }
}
