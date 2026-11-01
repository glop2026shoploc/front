import { cookies } from "next/headers"
export async function setSession(token:string){
    (await cookies()).set("token", token, { httpOnly: true })
} 