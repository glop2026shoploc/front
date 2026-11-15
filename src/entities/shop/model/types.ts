export interface Shop {
    shopId: string;
    name: string;
    siret: string;
    categoryIds: string[];
    address: {
        road: string;
        number: string | null;
        complement: string | null;
        cityId: string;
    };
    status: "WAITING" | "VALIDATED" | "REJECTED";
}

export interface OpeningHours {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
}
