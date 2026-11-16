"use server";

import { ShopKeeperLogin } from "@/entities/shopkeeper";
import { login,setSession,TokenResponse} from "@/entities/utilisateur";
import { routes } from "@/shared/config/routes";
import { validationMessages } from "@/shared/lib/validations";
import { redirect } from "next/navigation";
import { z } from 'zod'

export type ConnexionState = { error?: string, email?:string};

const schema = z.object({
    email: z.email({error: 'Email invalide',}),
    password: z.string().min(1, { error: "Mot de passe requis" }),
})

export type LoginShopKeeperResponse =
    | { success: true; }
    | { success: false; message: string };

export async function shopkeeperLoginAction (shopkeeper: ShopKeeperLogin):Promise<LoginShopKeeperResponse> {
    const email = shopkeeper.email.trim().toLowerCase();
    try{
       if(!email||!shopkeeper.password){
            return { success: false, message: validationMessages.allFieldsRequired};
       }
        const loginResponse:TokenResponse = await login({ ...shopkeeper, email },'MERCHANT');
        await setSession(loginResponse.token);
    }catch(error){
        return {
            success: false,
            message: error instanceof Error ? error.message : "Une erreur est survenue.",
        };
    }
    redirect(routes.home);
}