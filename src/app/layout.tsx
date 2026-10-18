import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

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
        </div>
      </header>
      <main>{children}</main>
      </body>
      </html>
  );
}