"use server";

import { login,setSession,TokenResponse} from "@/entities/utilisateur/";

export async function connexionAction (form: FormData) {
    console.log(form);
    if(!form||!form.get('password')||!form.get('email'))throw new Error();
    const loginResponse:TokenResponse = await login({
        email: form.get("email") as string,
        password: form.get("password") as string,
    });
    await setSession(loginResponse.token);
}