import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { siteConfig } from "@/shared/config/site";
import { buttonVariants } from "@/shared/ui/button";
import { getSession, getSessionClaims } from "@/entities/user";
import { LogoutButton } from "@/features/logout";

export async function SiteHeader() {
    const isLoggedIn = !!(await getSession());
    const session = await getSessionClaims();
    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
                <Link href={routes.home} className="flex items-center gap-2.5 font-medium">
                    {siteConfig.name}
                </Link>
                <nav aria-label="Compte" className="flex items-center gap-3 text-sm">
                    {session?.role === "CLIENT" && (
                        <Link href={routes.shops} className="font-medium hover:underline">
                            Commerçants
                        </Link>
                    )}
                    {
                        isLoggedIn? (<LogoutButton />)
                        :
                            
                        <>
                            <Link href={routes.signUp} className="font-medium hover:underline">
                            Créer un compte
                            </Link>
                            <Link href={routes.signIn} className={buttonVariants({ variant: "outline", size: "lg" })}>
                                Se connecter
                            </Link>
                        
                        </>
                    }
                    
                </nav>
            </div>
        </header>
    );
}