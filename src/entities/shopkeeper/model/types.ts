import { Credentials } from "@/entities/user";

export interface ShopkeeperRegistration {
    firstName: string;
    lastName: string;
    companyName: string;
    categoryId: string;
    siret: string;
    address: string;
    cityId: string;
    email: string;
    password: string;
    dataUsageConsent: boolean;
}

export type ShopKeeperLogin = Credentials;

export interface TokenResponse {
    type: string;
    token: string;
}
