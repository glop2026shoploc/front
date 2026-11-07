import {City} from "@/entities/city/model/types";
import {apiConfig} from "@/shared/config/api";

export async function getCities(): Promise<City[]> {
    const response = await fetch(`${apiConfig.gateway}/api/users/cities`);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargement des villes: ${response.status}`);
    }

    return response.json();
}