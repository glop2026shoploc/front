/**
 * Géocodage d'adresses françaises via la Géoplateforme de l'IGN (gratuit, sans clé d'API).
 * Documentation : https://geoservices.ign.fr/documentation/services/services-geoplateforme/geocodage
 *
 * Appelé depuis le navigateur (l'API autorise CORS), à chaque frappe dans le champ adresse.
 */
const SEARCH_URL = "https://data.geopf.fr/geocodage/search";

export interface AddressSuggestion {
    /** Adresse complète à afficher, ex. "50 Boulevard Jean-Baptiste Lebas 59000 Lille". */
    label: string;
    number: string | null;
    road: string;
    zipCode: string;
    city: string;
    latitude: number;
    longitude: number;
}

/** Une adresse de la réponse GeoJSONs */
interface GeocodingFeature {
    geometry: { coordinates: [longitude: number, latitude: number] };
    properties: {
        label: string;
        housenumber?: string;
        street?: string;
        name: string;
        postcode: string;
        city: string;
    };
}

export async function searchAddresses(text: string, signal?: AbortSignal): Promise<AddressSuggestion[]> {
    const params = new URLSearchParams({ q: text, autocomplete: "1", index: "address", limit: "5" });
    const response = await fetch(`${SEARCH_URL}?${params}`, { signal });

    if (!response.ok) {
        throw new Error(`Erreur lors de la recherche d'adresse : ${response.status}`);
    }

    const { features }: { features: GeocodingFeature[] } = await response.json();
    return features.map(toSuggestion);
}

function toSuggestion({ geometry, properties }: GeocodingFeature): AddressSuggestion {
    const [longitude, latitude] = geometry.coordinates;
    return {
        label: properties.label,
        number: properties.housenumber ?? null,
        road: properties.street ?? properties.name,
        zipCode: properties.postcode,
        city: properties.city,
        latitude,
        longitude,
    };
}
