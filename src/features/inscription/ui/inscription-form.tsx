import {Button} from "@/shared/ui/button"
import {Input} from "@/shared/ui/input"
import Link from "next/link";

interface RegisterProps {
    onSubmit: (value: FormData) => void;
}

export function RegisterForm({onSubmit} : RegisterProps) {
    return (
        <>
        <div className="flex h-screen">
  <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Inscription</h1>
      <form action={onSubmit} className="space-y-4">
        <div>
          <label  className="block text-sm font-medium text-gray-700">Nom</label>
          <Input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label  className="block text-sm font-medium text-gray-700">Prénom</label>
          <Input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label  className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <Button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</Button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Vous avez déjà un compte ? 
          <Link href="/authentification/connexion" className="text-black hover:underline">
            Connectez vous ici ? 
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
        </>);}