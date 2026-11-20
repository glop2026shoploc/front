"use client";

import type { CategorieCommercant } from "@/entities/commercant";

interface FiltreCategorieProps {
    value: string;
    categories: CategorieCommercant[];
    onChange: (categoryId: string) => void;
}

export function FiltreCategorie({ value, categories, onChange }: FiltreCategorieProps) {
    return (
        <label className="flex max-w-sm flex-col gap-2 text-sm font-medium">
            Catégorie
            <select
                className="h-10 rounded-lg border border-input bg-card px-3 text-foreground"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">Toutes les catégories</option>
                {categories.map((categorie) => (
                    <option key={categorie.categoryId} value={categorie.categoryId}>{categorie.name}</option>
                ))}
            </select>
        </label>
    );
}
