"use client"
import { Alert } from "@/shared/ui/alert";
import {Button} from "@/shared/ui/button"
import {Input} from "@/shared/ui/input"
import { Loader } from "@/shared/ui/loader";

import Link from "next/link";
import { Dispatch, useState, SetStateAction, useActionState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { SegmentedLinks } from "@/shared/ui/segmented-links";
import { siteConfig } from "@/shared/config/site";
import { routes } from "@/shared/config/routes";
import { StoreIcon, UserIcon } from "lucide-react";
import { LoginClientForm } from "@/features/login-client";
import { LoginShopKeeperForm } from "@/features/login-shopkeeper";




interface AccountLoginProps {
    role: RegistrationRole;
}


export type RegistrationRole = "client" | "shopkeeper";

export function LoginForm({role} : AccountLoginProps) {

     return (
        <div className="mx-auto w-full max-w-xl px-4 py-10">
            <Card className="[--card-spacing:--spacing(6)]">
                <CardHeader>
                    <CardDescription className="text-[11px] font-semibold tracking-widest uppercase">
                        Bienvenue chez {siteConfig.name}
                    </CardDescription>
                    <CardTitle className="text-2xl">
                        <h1>Connexion</h1>
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Je me connecte en tant que</p>
                        <SegmentedLinks
                            label="Je me connecte en tant que"
                            items={[
                                {
                                    label: "Client",
                                    href: `${routes.signIn}?role=client`,
                                    active: role === "client",
                                    icon: <UserIcon aria-hidden className="size-4" />,
                                },
                                {
                                    label: "Commerçant",
                                    href: `${routes.signIn}?role=shopkeeper`,
                                    active: role === "shopkeeper",
                                    icon: <StoreIcon aria-hidden className="size-4" />,
                                },
                            ]}
                        />
                    </div>

                    {role === "client" ? <LoginClientForm /> : <LoginShopKeeperForm/>}
                </CardContent>

                <CardFooter className="justify-center text-xs text-muted-foreground">
                    Pas encore de compte ?&nbsp;
                    <Link href={routes.signUp} className="font-medium text-foreground underline underline-offset-4">
                        Créer un compte
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );}