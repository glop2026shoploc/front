export interface Shop {
    shopId: string;
    name: string;
    siret: string;
    address: {
        road: string;
        number: string | null;
    };
    status: "WAITING" | "VALIDATED" | "REJECTED";
}
