import { Credentials } from "@/entities/user";

export interface ClientRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cityId: string;
    dataUsageConsent: boolean;
}

export type ClientLogin = Credentials;

export interface AddClient{
    cityId:string;
}
