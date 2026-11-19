import { LoginForm } from "@/widgets/login/ui/login";
import { siteConfig } from "@/shared/config/site";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Se connecter - ${siteConfig.name}`,
};

interface LoginPageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
      const { role } = await searchParams;
    return (
        <>
        <LoginForm role={role === "shopkeeper" ? "shopkeeper" : "client"}/>
        </>);}

