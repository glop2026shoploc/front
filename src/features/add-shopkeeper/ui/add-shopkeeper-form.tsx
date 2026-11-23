"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { addShopkeeperAction, type AddShopkeeperResult } from "../model/add-shopkeeper-action";
import {Field,} from "@/shared/ui/field";
import {City} from "@/entities/city";
import {Category} from "@/entities/category";
import { AddShopKeeper } from "@/entities/shopkeeper";

const initialFormState: AddShopKeeper = {
    companyName: "",
    categoryId: "",
    siret: "",
    address: "",
    cityId: "",
};

interface ShopkeeperOptionsProps {
    cities: City[];
    categories: Category[];
}

export function AddShopkeeperForm({ cities, categories }: ShopkeeperOptionsProps) {
    const [result, setResult] = useState<AddShopkeeperResult | null>(null);
    const [form, setForm] = useState<AddShopKeeper>(initialFormState);
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
                const outcome = await addShopkeeperAction(form);
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

            <Button type="submit" disabled={isPending}>
                {isPending ? "Envoi..." : "S'inscrire"}
            </Button>
        </form>
    );
}