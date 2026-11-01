import {Input}  from "@/shared/ui/input";
import  {Button}  from "@/shared/ui/button";
import { connexionAction,LoginForm } from "@/features/connexion";

export default async function LoginPage() {
    return (
        <>
        <LoginForm onSubmit={connexionAction}/>
        </>);}

