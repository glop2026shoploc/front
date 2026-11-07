"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { routes } from "@/shared/config/routes";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldHint } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { PasswordInput } from "@/shared/ui/password-input";
import { ClientRegistration } from "@/entities/client";
import { submitClientRegistration, type RegisterClientResult } from "../model/register-client-action";
import {City} from "@/entities/city";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";

const initialFormState: ClientRegistration = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cityId: "",
    dataUsageConsent: false,
};

interface ClientCity  {
    cities: City[];
}

export function RegisterClientForm({ cities }: ClientCity ) {
    const [result, setResult] = useState<RegisterClientResult | null>(null);
    const [form, setForm] = useState<ClientRegistration>(initialFormState);
    const [isPending, setIsPending] = useState(false);

    if (result?.success) {
        return (
            <Alert>
                <AlertTitle>Compte créé avec succès</AlertTitle>
            </Alert>
        );
    }

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                setIsPending(true);
                const outcome = await submitClientRegistration(form);
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

            <Field>
                <Label htmlFor="city">Ville</Label>
                <Select
                    items={cities.map((city) => ({ label: city.name, value: city.id }))}
                    value={form.cityId || null}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, cityId: value ?? "" }))}
                >
                    <SelectTrigger id="categorie">
                        <SelectValue placeholder="Sélectionner votre ville" />
                    </SelectTrigger>
                    <SelectContent>
                        { cities.map( (city) => (
                            <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

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
                    placeholder="Créez votre mot de passe"
                    autoComplete="new-password"
                    minLength={12}
                    aria-describedby="password-hint"
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    required
                />
                <FieldHint id="password-hint">
                    Au moins 12 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.
                </FieldHint>
            </Field>

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

            <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
                {isPending ? "Création…" : "Créer mon compte client"}
                <ArrowRightIcon aria-hidden />
            </Button>
        </form>
    );
}