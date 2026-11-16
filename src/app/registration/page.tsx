import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { AccountRegistration } from "@/widgets/registration";

export const metadata: Metadata = {
  title: `Créer un compte - ${siteConfig.name}`,
};

interface InscriptionPageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function InscriptionPage({ searchParams }: InscriptionPageProps) {
  const { role } = await searchParams;

  return <AccountRegistration role={role === "shopkeeper" ? "shopkeeper" : "client"} />;
}