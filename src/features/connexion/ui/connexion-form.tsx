"use client"
import { Alert } from "@/shared/ui/alert";
import {Button} from "@/shared/ui/button"
import {Input} from "@/shared/ui/input"
import { Loader } from "@/shared/ui/loader";

import Link from "next/link";
import { Dispatch, useState, SetStateAction, useActionState } from "react";
import type { ConnexionState } from "../model/connexion-action";


interface LoginProps {
    onSubmit: (prev: ConnexionState,form: FormData) => Promise<ConnexionState>;
}

const initialState: ConnexionState = {};

export function LoginForm({onSubmit} : LoginProps) {

     const [state, formAction, pending] = useActionState(onSubmit, initialState)


    return (
        <>
        

        {state.error && (<Alert><p>{state.error}</p></Alert>)}

        <div className="flex h-screen">
  <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Connexion</h1>
      {!pending && (
      <form action={formAction} className="space-y-4">
        <div>
          <label  className="block text-sm font-medium text-gray-700">Email</label>
          <Input defaultValue={state.email} type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <Button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</Button>
        </div>
      </form>
    )}
    {pending && (
      <div className="flex justify-center py-8">
        <Loader className="h-10 w-10 border-4"/>
      </div>
    )}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Pas de compte ? 
          <Link href="/authentification/inscription" className="text-black hover:underline">
            Inscrivez vous ici ? 
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
        
        </>);}