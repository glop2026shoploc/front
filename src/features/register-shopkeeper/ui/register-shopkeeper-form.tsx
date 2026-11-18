"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { registerShopkeeperAction, type RegisterShopkeeperResult } from "../model/register-shopkeeper-action";
import {ShopkeeperRegistration} from "@/entities/shopkeeper";
import {Field, FieldHint} from "@/shared/ui/field";
import { Checkbox } from "@/shared/ui/checkbox";
import Link from "next/link";
import {routes} from "@/shared/config/routes";
import {City} from "@/entities/city";
import {Category} from "@/entities/category";

const initialFormState: ShopkeeperRegistration = {
    firstName: "",
    lastName: "",
    companyName: "",
    categoryId: "",
    siret: "",
    address: "",
    cityId: "",
    email: "",
    password: "",
    dataUsageConsent: false,
};

interface ShopkeeperOptionsProps {
    cities: City[];
    categories: Category[];
}

export function RegisterShopkeeperForm({ cities, categories }: ShopkeeperOptionsProps) {
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
                const outcome = await registerShopkeeperAction(form);
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

            <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                        id="lastName"
                        placeholder="Votre nom"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                    />
                </Field>
            </div>

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

            <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                    <Label htmlFor="address">Adresse postale</Label>
                    <Input
                        id="address"
                        placeholder="N° Rue du Commerce"
                        autoComplete="address"
                        value={form.address}
                        onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="city">Ville</Label>
                    <Select
                        items={cities.map((city) => ({ label: city.name, value: city.id }))}
                        value={form.cityId || null}
                        onValueChange={(value) => setForm((prev) => ({ ...prev, cityId: value ?? "" }))}
                    >
                        <SelectTrigger id="city">
                            <SelectValue placeholder="Sélectionner votre ville" />
                        </SelectTrigger>
                        <SelectContent>
                            { cities.map( (city) => (
                                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select
                    items={categories.map((category) => ({ label: category.name, value: category.id }))}
                    value={form.categoryId || null}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, categoryId: value ?? "" }))}
                >
                    <SelectTrigger id="categorie">
                        <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        { categories.map( (category) => (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
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

            <div className="flex items-start gap-2 text-sm">
                <Checkbox
                    className="mt-0.5"
                    checked={form.dataUsageConsent}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, dataUsageConsent: checked }))}
                />
                <FieldHint>
                    J’accepte l’utilisation de mes données personnelles pour créer et gérer mon compte.{" "}
                    <Link href={routes.privacyPolicy} target="_blank" className="underline underline-offset-4">
                        En savoir plus sur l’utilisation de mes données
                    </Link>
                    .
                </FieldHint>
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Envoi..." : "S'inscrire"}
            </Button>
        </form>
    );
}