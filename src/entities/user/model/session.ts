import { cookies } from "next/headers"
export async function setSession(token:string){
    (await cookies()).set("token", token, { httpOnly: true })
} 

export async function getSession(): Promise<string|undefined>{
    return ((await cookies()).get("token")?.value);
}

export async function clearSession() {
    (await cookies()).delete("token");
    
}