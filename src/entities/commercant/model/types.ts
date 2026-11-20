export interface CategorieCommercant {
    categoryId: string;
    name: string;
}

export interface AdresseCommercant {
    road: string;
    number?: string | null;
    complement?: string | null;
}

export interface Commercant {
    shopId: string;
    name: string;
    category: CategorieCommercant;
    address: AdresseCommercant;
    status: "WAITING" | "VALIDATED" | "REJECTED";
}
