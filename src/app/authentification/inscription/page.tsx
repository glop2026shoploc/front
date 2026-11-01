import {Input}  from "@/shared/ui/input";
import  {Button}  from "@/shared/ui/button";
import { inscriptionAction,RegisterForm } from "@/features/inscription/";

export default async function AuthentificationPage() {
    return (
        <>
          <RegisterForm onSubmit={inscriptionAction}/>
        </>);}

