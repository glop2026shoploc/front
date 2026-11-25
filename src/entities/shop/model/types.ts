export interface ShopAddress {
    addressId: string;
    road: string;
    number: string | null;
    complement: string | null;
    cityId: string;
    /** Position du commerce ; null tant qu'il n'est pas géolocalisé. */
    latitude: number | null;
    longitude: number | null;
}

export interface Shop {
    shopId: string;
    name: string;
    siret: string;
    categoryIds: string[];
    address: ShopAddress;
    status: "WAITING" | "VALIDATED" | "REJECTED";
    favorite: boolean;
}
