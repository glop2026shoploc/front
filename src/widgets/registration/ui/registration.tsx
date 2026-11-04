import Image from "next/image";
import Link from "next/link";
import { StoreIcon, UserIcon } from "lucide-react";
import { routes } from "@/shared/config/routes";
import { siteConfig } from "@/shared/config/site";
import { SegmentedLinks } from "@/shared/ui/segmented-links";
import { RegisterClientForm } from "@/features/register-client";
import { RegisterShopkeeperForm } from "@/features/register-shopkeeper";
import {Card} from "@/shared/ui/card";

export type RegistrationRole = "client" | "shopkeeper";

interface AccountRegistrationProps {
    role: RegistrationRole;
}

export function AccountRegistration({ role }: AccountRegistrationProps) {

    return (
        <div className="m-auto w-1/2  p-5 rounded-2xl">
            <Card>
                <div className="p-5">
                    <div className="flex flex-col gap-2">
                        <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                            Bienvenue chez {siteConfig.name}
                        </p>
                        <h1 className="text-3xl font-medium">Créer un compte</h1>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Je m’inscris en tant que</p>
                        <SegmentedLinks
                            label="Je m’inscris en tant que"
                            items={[
                                {
                                    label: "Client",
                                    href: `${routes.signUp}?role=client`,
                                    active: role === "client",
                                    icon: <UserIcon aria-hidden className="size-4" />,
                                },
                                {
                                    label: "Commerçant",
                                    href: `${routes.signUp}?role=shopkeeper`,
                                    active: role === "shopkeeper",
                                    icon: <StoreIcon aria-hidden className="size-4" />,
                                },
                            ]}
                        />
                    </div>

                    <p className="text-xs text-muted-foreground mt-4 mb-4">Tous les champs sont obligatoires.</p>

                    {role === "client" ? <RegisterClientForm /> : <RegisterShopkeeperForm />}

                    <p className="text-center text-xs text-muted-foreground mt-4">
                        Déjà un compte ?{" "}
                        <Link href={routes.signIn} className="font-medium text-foreground underline underline-offset-4">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}