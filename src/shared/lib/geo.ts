export interface Coordinates {
    latitude: number;
    longitude: number;
}
/** Généré avec IA */

const EARTH_RADIUS_KM = 6371;
/** Distance entre deux points, en km */
export function distanceKm(from: Coordinates, to: Coordinates): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const latitudeDelta = toRadians(to.latitude - from.latitude);
    const longitudeDelta = toRadians(to.longitude - from.longitude);
    const a =
        Math.sin(latitudeDelta / 2) ** 2 +
        Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
    return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/** "350 m" en dessous d'un km, "1,2 km" jusqu'à 10 km, "43 km" au-delà. */
export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 100) * 10} m`;
    }
    if (km < 10) {
        return `${km.toFixed(1).replace(".", ",")} km`;
    }
    return `${Math.round(km)} km`;
}
