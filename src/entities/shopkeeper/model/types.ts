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

export interface ShopkeeperInfo {
    companyName: string;
    category: string;
    siret: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    status: "WAITING" | "VALIDATED" | "REJECTED";
}