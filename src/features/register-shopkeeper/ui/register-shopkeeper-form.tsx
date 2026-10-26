"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { registerShopkeeperAction, type RegisterShopkeeperResult } from "../model/register-shopkeeper-action";
import {ShopkeeperRegistration} from "@/entities/shopkeeper";

const initialFormState: ShopkeeperRegistration = {
    companyName: "",
    category: "",
    siret: "",
    address: "",
    email: "",
    password: "",
};

export function RegisterShopkeeperForm() {
    const [result, setResult] = useState<RegisterShopkeeperResult | null>(null);
    const [form, setForm] = useState<ShopkeeperRegistration>(initialFormState);
    const [isPending, setIsPending] = useState(false);

    if (result?.success) {
        return (
            <Alert>
                <AlertTitle>Inscription envoyée</AlertTitle>
                <AlertDescription>
                    Votre demande est en attente de validation par un administrateur.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                setIsPending(true);
                const outcome = await registerShopkeeperAction(form);
                setIsPending(false);
                setResult(outcome);
            }}
            className="flex flex-col gap-4"
        >
            {result && !result.success && (
                <Alert variant="destructive">
                    <AlertDescription>{result.message}</AlertDescription>
                </Alert>
            )}

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="raisonSociale">Raison sociale</Label>
                <Input
                    id="raisonSociale"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select
                    value={form.category || null}
                    onValueChange={(value) => setForm({ ...form, category: value ?? "" })}
                >
                    <SelectTrigger id="categorie">
                        <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALIMENTATION">Alimentation</SelectItem>
                        <SelectItem value="VETEMENT">Vêtement</SelectItem>
                        <SelectItem value="SERVICES">Services</SelectItem>
                        <SelectItem value="AUTRE">Autre</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="siret">N° SIRET</Label>
                <Input
                    id="siret"
                    inputMode="numeric"
                    value={form.siret}
                    onChange={(e) => setForm({ ...form, siret: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="adressePostale">Adresse postale</Label>
                <Input
                    id="adressePostale"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                    id="password"
                    type="password"
                    minLength={12}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Envoi..." : "S'inscrire"}
            </Button>
        </form>
    );
}