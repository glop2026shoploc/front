"use server";

import { register,setSession,TokenResponse} from "@/entities/utilisateur/";

export async function inscriptionAction (form: FormData) {
    console.log(form);
    if(!form||!form.get('firstname')||!form.get('lastname')||!form.get('password')||!form.get('email'))throw new Error();
    const registerResponse:TokenResponse = await register({
        firstName: form.get("firstname") as string,
        lastName: form.get("lastname") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
    });
    await setSession(registerResponse.token);
}