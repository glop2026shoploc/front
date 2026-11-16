"use server";

import { ClientLogin } from "@/entities/client";
import { login,setSession,TokenResponse,Role} from "@/entities/utilisateur";
import { routes } from "@/shared/config/routes";
import { validationMessages } from "@/shared/lib/validations";
import { redirect } from "next/navigation";
import { z } from 'zod'

export type ConnexionState = { error?: string, email?:string};

const schema = z.object({
    email: z.email({error: 'Email invalide',}),
    password: z.string().min(1, { error: "Mot de passe requis" }),
})

export type LoginClientResponse =
    | { success: true; }
    | { success: false; message: string };

export async function clientLoginAction (client: ClientLogin):Promise<LoginClientResponse> {
    const email = client.email.trim().toLowerCase();
    try{
       if(!email||!client.password){
            return { success: false, message: validationMessages.allFieldsRequired};
       }
        const loginResponse:TokenResponse = await login({ ...client, email }, "CLIENT");
        await setSession(loginResponse.token);
        
    }catch(error){
        return {
            success: false,
            message: error instanceof Error ? error.message : "Une erreur est survenue.",
        };
    }
    redirect(routes.home);
}