"use client";

import { categoriesCommercants } from "@/entities/commercant";

interface FiltreCategorieProps {
    value: string;
    onChange: (categorie: string) => void;
}

export function FiltreCategorie({ value, onChange }: FiltreCategorieProps) {
    return (
        <label className="flex max-w-sm flex-col gap-2 text-sm font-medium">
            Catégorie
            <select
                className="h-10 rounded-lg border border-input bg-card px-3 text-foreground"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="Toutes">Toutes les catégories</option>
                {categoriesCommercants.map((categorie) => (
                    <option key={categorie} value={categorie}>{categorie}</option>
                ))}
            </select>
        </label>
    );
}
