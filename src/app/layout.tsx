import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";
import {SiteHeader} from "@/widgets/header";
import {SiteFooter} from "@/widgets/footer";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="fr">
      <body className="min-h-screen bg-background text-foreground antialiased">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link href="/artists" className="font-semibold">
            {siteConfig.name}
          </Link>
          <Link href="/commercants" className="ml-6 text-sm underline">
            Commerçants
          </Link>
          <Link href="/inscription" className="ml-auto text-sm underline">
            Créer un compte
          </Link>
        </div>
      </header>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      </body>
      </html>
  );
}
