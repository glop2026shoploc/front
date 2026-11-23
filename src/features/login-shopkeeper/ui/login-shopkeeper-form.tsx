"use client"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import {Button} from "@/shared/ui/button"
import {Input} from "@/shared/ui/input"
import { shopkeeperLoginAction, LoginShopKeeperResponse } from "../model/login-shopkeeper-action";
import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Field } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { PasswordInput } from "@/shared/ui/password-input";
import { ShopKeeperLogin } from "@/entities/shopkeeper";

const initialFormState: ShopKeeperLogin = {
    email: "",
    password: "",
};


export function LoginShopKeeperForm(){
    const [result, setResult] = useState<LoginShopKeeperResponse | null>(null);
    const [form, setForm] = useState<ShopKeeperLogin>(initialFormState);
    const [isPending, setIsPending] = useState(false);

    if (result?.success) {
        return (
            <Alert>
                <AlertTitle>Connexion effectuée avec succès</AlertTitle>
            </Alert>
        );
    }

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                setIsPending(true);
                const outcome = await shopkeeperLoginAction(form);
                setIsPending(false);
                setResult(outcome);
            }}
            className="flex flex-col gap-4"
        >
            <p className="text-xs text-muted-foreground">Tous les champs sont obligatoires.</p>

            {result && !result.success && (
                <Alert variant="destructive">
                    <AlertDescription>{result.message}</AlertDescription>
                </Alert>
            )}
            <Field>
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="vous@exemple.fr"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
            </Field>

            <Field>
                <Label htmlFor="password">Mot de passe</Label>
                <PasswordInput
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                />
            </Field>
            <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
                {isPending ? "Connexion…" : "Se connecter à son compte commerçant"}
                <ArrowRightIcon aria-hidden />
            </Button>
        </form>
    );
}