import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { siteConfig } from "@/shared/config/site";

export function SiteFooter() {
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{siteConfig.name}</span>
                    <span className="text-xs text-muted-foreground">{siteConfig.credit}</span>
                </div>
                <nav aria-label="Informations légales" className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                    <Link href={routes.terms} className="underline underline-offset-4">
                        Conditions générales d’utilisation
                    </Link>
                    <Link href={routes.privacyPolicy} className="underline underline-offset-4">
                        Politique de confidentialité
                    </Link>
                    <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-4">
                        {siteConfig.contactEmail}
                    </a>
                </nav>
            </div>
        </footer>
    );
}