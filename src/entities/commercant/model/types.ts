export interface Commercant {
    id: string;
    name: string;
    category: string;
    address: string;
}

export const categoriesCommercants = [
    "Boulangerie",
    "Presse",
    "Vêtements",
    "Alimentation",
] as const;
