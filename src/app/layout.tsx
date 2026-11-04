import type { Metadata } from "next";
import Link from "next/link";
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
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      </body>
      </html>
  );
}
