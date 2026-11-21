import { Credentials } from "@/entities/user";

/** Adresse choisie dans l'autocomplétion : normalisée et géolocalisée. */
export interface ShopLocation {
    number: string | null;
    road: string;
    latitude: number;
    longitude: number;
}

export interface ShopkeeperRegistration {
    firstName: string;
    lastName: string;
    companyName: string;
    categoryId: string;
    siret: string;
    address: string;
    /** Renseigné quand une suggestion est choisie */
    location: ShopLocation | null;
    cityId: string;
    email: string;
    password: string;
    dataUsageConsent: boolean;
}

export interface AddShopKeeper {
    companyName: string;
    categoryId: string;
    siret: string;
    address: string;
    cityId: string;
}


export type ShopKeeperLogin = Credentials;

export interface TokenResponse {
    type: string;
    token: string;
}
