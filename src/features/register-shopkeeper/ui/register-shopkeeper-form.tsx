"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { registerShopkeeperAction, type RegisterShopkeeperResult } from "../model/register-shopkeeper-action";
import {ShopkeeperRegistration} from "@/entities/shopkeeper";
import {FieldHint} from "@/shared/ui/field";
import { Checkbox } from "@/shared/ui/checkbox";
import Link from "next/link";
import {routes} from "@/shared/config/routes";

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
    const [dataUsageConsent, setDataUsageConsent] = useState(false);

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
                const outcome = await registerShopkeeperAction(form, dataUsageConsent);
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
                    placeholder="MonCommercant"
                    value={form.companyName}
                    onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select
                    value={form.category || null}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, category: value ?? "" }))}
                >
                    <SelectTrigger id="categorie">
                        <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALIMENTATION">Alimentation</SelectItem>
                        <SelectItem value="VETEMENT">Vêtement</SelectItem>
                        <SelectItem value="SERVICES">Restauration</SelectItem>
                        <SelectItem value="SERVICES">Bricolage & Réparation</SelectItem>
                        <SelectItem value="SERVICES">Presse</SelectItem>
                        <SelectItem value="SERVICES">Loisirs</SelectItem>
                        <SelectItem value="SERVICES">Optique</SelectItem>
                        <SelectItem value="SERVICES">Animalerie</SelectItem>
                        <SelectItem value="AUTRE">Autre</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="siret">N° SIRET</Label>
                <Input
                    id="siret"
                    placeholder="12345678900013"
                    inputMode="numeric"
                    value={form.siret}
                    onChange={(e) => setForm((prev) => ({ ...prev, siret: e.target.value }))}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="adressePostale">Adresse postale</Label>
                <Input
                    id="adressePostale"
                    placeholder="N° Rue"
                    value={form.address}
                    onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    placeholder="moncommercant@example.fr"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                    id="password"
                    placeholder="Créez votre mot de passe"
                    type="password"
                    minLength={12}
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                />
                <FieldHint id="password-hint">
                    Au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.
                </FieldHint>
            </div>

            <label className="flex items-start gap-2 text-sm">
                <Checkbox className="mt-0.5" checked={dataUsageConsent} onCheckedChange={setDataUsageConsent} />
                <span>
                    J’accepte l’utilisation de mes données personnelles pour créer et gérer mon compte.{" "}
                    <Link href={routes.privacyPolicy} target="_blank" className="underline underline-offset-4">
                        En savoir plus sur l’utilisation de mes données
                    </Link>
                    .
                </span>
            </label>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Envoi..." : "S'inscrire"}
            </Button>
        </form>
    );
}