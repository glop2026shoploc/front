import Link from "next/link";
import { StoreIcon, UserIcon } from "lucide-react";
import { routes } from "@/shared/config/routes";
import { siteConfig } from "@/shared/config/site";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { SegmentedLinks } from "@/shared/ui/segmented-links";
import { RegisterClientForm } from "@/features/register-client";
import { RegisterShopkeeperForm } from "@/features/register-shopkeeper";
import {getCities} from "@/entities/city";
import {getCategories} from "@/entities/category";

export type RegistrationRole = "client" | "shopkeeper";

interface AccountRegistrationProps {
    role: RegistrationRole;
}

export async function AccountRegistration({ role }: AccountRegistrationProps) {
    const cities = await getCities();
    const categories = await getCategories();

    return (
        <div className="mx-auto w-full max-w-xl px-4 py-10">
            <Card className="[--card-spacing:--spacing(6)]">
                <CardHeader>
                    <CardDescription className="text-[11px] font-semibold tracking-widest uppercase">
                        Bienvenue chez {siteConfig.name}
                    </CardDescription>
                    <CardTitle className="text-2xl">
                        <h1>Créer un compte</h1>
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
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

                    {role === "client" ? <RegisterClientForm cities={cities} /> : <RegisterShopkeeperForm cities={cities} categories={categories} />}
                </CardContent>

                <CardFooter className="justify-center text-xs text-muted-foreground">
                    Déjà un compte ?&nbsp;
                    <Link href={routes.signIn} className="font-medium text-foreground underline underline-offset-4">
                        Se connecter
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}