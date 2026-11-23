"use client";

import type { Category } from "@/entities/category";

interface ShopCategoryFilterProps {
    value: string;
    categories: Category[];
    onChange: (categoryId: string) => void;
}

export function ShopCategoryFilter({ value, categories, onChange }: ShopCategoryFilterProps) {
    return (
        <label className="flex max-w-sm flex-col gap-2 text-sm font-medium">
            Catégorie
            <select
                className="h-10 rounded-lg border border-input bg-card px-3 text-foreground"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </label>
    );
}
