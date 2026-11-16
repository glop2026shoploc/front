import { Credentials } from "@/entities/utilisateur";

export interface ClientRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cityId: string;
    dataUsageConsent: boolean;
}

export type ClientLogin = Credentials;
