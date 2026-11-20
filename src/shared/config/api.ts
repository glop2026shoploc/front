export const apiConfig = {
    gateway: process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:8080",
    users: process.env.USERS_API_URL ?? "http://localhost:8081",
    fidelity: process.env.FIDELITY_API_URL ?? "http://localhost:8082",
    statistiques: process.env.STATISTIQUES_API_URL ?? "http://localhost:8083",
    commande: process.env.COMMANDE_API_URL ?? "http://localhost:8084",
    catalogue: process.env.CATALOGUE_API_URL ?? "http://localhost:8085",
};
