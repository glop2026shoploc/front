"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Field, FieldHint } from "@/shared/ui/field";
import { Label } from "@/shared/ui/label";
import { AddClient } from "@/entities/client";
import { submitAddClient,  type AddClientResult } from "../model/add-client-action";
import {City} from "@/entities/city";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";

const initialFormState: AddClient = {
    cityId: "",
};

interface ClientCity  {
    cities: City[];
}

export function AddClientForm({ cities }: ClientCity ) {
    const [result, setResult] = useState<AddClientResult | null>(null);
    const [form, setForm] = useState<AddClient>(initialFormState);
    const [isPending, setIsPending] = useState(false);

    if (result?.success) {
        return (
            <Alert>
                <AlertTitle>Ajout du compte client avec succès</AlertTitle>
            </Alert>
        );
    }

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                setIsPending(true);
                const outcome = await submitAddClient(form);
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


            <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
                {isPending ? "Création…" : "Créer mon compte client"}
                <ArrowRightIcon aria-hidden />
            </Button>
        </form>
    );
}