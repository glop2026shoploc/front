export interface ShopkeeperRegistration {
    companyName: string;
    category: string;
    siret: string;
    address: string;
    email: string;
    password: string;
}

export interface ShopkeeperInfo {
    companyName: string;
    category: string;
    siret: string;
    address: string;
    email: string;
    status: "WAITING" | "VALIDATED" | "REJECTED";
}