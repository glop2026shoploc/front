import { cookies } from "next/headers"
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
