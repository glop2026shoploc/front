"use server";

import { login,setSession,TokenResponse} from "@/entities/utilisateur/";
import { z } from 'zod'

export type ConnexionState = { error?: string, email?:string};

const schema = z.object({
    email: z.email({error: 'Email invalide',}),
    password: z.string().min(1, { error: "Mot de passe requis" }),
})

export async function connexionAction (_prev: ConnexionState, form: FormData):Promise<ConnexionState> {
    const email = form.get("email") as string;
   
    try{
        const validatedFields = schema.safeParse({
                email: form.get("email") as string,
                password: form.get("password") as string,
        })
       if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message, email};
        }
        const loginResponse:TokenResponse = await login( validatedFields.data);
        await setSession(loginResponse.token);
        return {}
    }catch{
        return { error: "Identifiants incorrects", email };
    }
}