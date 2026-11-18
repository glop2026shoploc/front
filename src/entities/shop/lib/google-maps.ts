import type { ShopAddress } from "../model/types";

export function formatShopAddress(address: ShopAddress, cityName: string): string {
    const street = [address.number, address.road].filter(Boolean).join(" ");
    return [street, address.complement, cityName].filter(Boolean).join(", ");
}

/**
 * Lien d'itinéraire Google Maps vers le commerce
 * Le point de départ est la position de l'utilisateur, gérée par Google Maps.
 */
export function googleMapsDirectionsUrl(shopName: string, fullAddress: string): string {
    const destination = encodeURIComponent(`${shopName}, ${fullAddress}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
