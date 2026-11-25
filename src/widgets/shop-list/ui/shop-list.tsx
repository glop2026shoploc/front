"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";
import type { Shop } from "@/entities/shop/model/types";
import { ShopCard } from "@/entities/shop/ui/shop-card";
import { updateFavoriteShopAction } from "@/features/update-favorite-shop";
import { distanceKm, type Coordinates } from "@/shared/lib/geo";
import { Button } from "@/shared/ui/button";

export interface ShopListItem {
    shop: Shop;
    cityName: string;
    categoryNames: string[];
}

type PositionState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "granted"; position: Coordinates }
    | { status: "denied" }
    | { status: "unavailable" };

const POSITION_ERRORS = {
    denied: "Vous avez refusé le partage de votre position. La liste reste affichée sans distances ; vous pouvez l'autoriser dans les réglages de votre navigateur.",
    unavailable: "Votre position n'a pas pu être déterminée. La liste reste affichée sans distances.",
};

/**
 * Liste des commerçants. Sur demande de l'utilisateur
 * affiche la distance de chaque commerce depuis sa position et trie du plus proche au plus lointain.
 * La position n'est utilisée que dans le navigateur : elle n'est ni envoyée ni enregistrée.
 */
export function ShopList({ items }: { items: ShopListItem[] }) {
    const [state, setState] = useState<PositionState>({ status: "idle" });

    function requestPosition() {
        if (!("geolocation" in navigator)) {
            setState({ status: "unavailable" });
            return;
        }
        setState({ status: "loading" });
        // Déclenche la demande d'autorisation du navigateur si elle n'a pas encore été donnée.
        navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
                setState({ status: "granted", position: { latitude: coords.latitude, longitude: coords.longitude } }),
            (error) => setState({ status: error.code === error.PERMISSION_DENIED ? "denied" : "unavailable" }),
            { timeout: 10_000, maximumAge: 60_000 }
        );
    }

    const position = state.status === "granted" ? state.position : undefined;
    const located = items.map((item) => {
        const { latitude, longitude } = item.shop.address;
        const distanceFromMeKm =
            position && latitude !== null && longitude !== null
                ? distanceKm(position, { latitude, longitude })
                : undefined;
        return { ...item, distanceFromMeKm };
    });
    // Avec une position : du plus proche au plus lointain, les commerces sans coordonnées à la fin.
    const sorted = position
        ? [...located].sort((a, b) => (a.distanceFromMeKm ?? Infinity) - (b.distanceFromMeKm ?? Infinity))
        : located;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                    {position
                        ? "Les distances sont calculées depuis votre position, qui reste sur votre appareil."
                        : "Partagez votre position pour voir la distance jusqu'à chaque commerçant. Elle reste sur votre appareil : elle n'est ni envoyée ni enregistrée."}
                </p>
                {position ? (
                    <Button variant="outline" size="sm" onClick={() => setState({ status: "idle" })}>
                        Ne plus utiliser ma position
                    </Button>
                ) : (
                    <Button size="sm" onClick={requestPosition} disabled={state.status === "loading"}>
                        <LocateFixed />
                        {state.status === "loading" ? "Localisation…" : "Utiliser ma position"}
                    </Button>
                )}
            </div>
            {(state.status === "denied" || state.status === "unavailable") && (
                <p role="alert" className="text-sm text-destructive">
                    {POSITION_ERRORS[state.status]}
                </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
                {sorted.map(({ shop, cityName, categoryNames, distanceFromMeKm }) => (
                    <ShopCard
                        key={shop.shopId}
                        shop={shop}
                        cityName={cityName}
                        distanceFromMeKm={distanceFromMeKm}
                        categoryNames={categoryNames}
                        isFavorite={shop.favorite}
                        onClickFavorite={() => updateFavoriteShopAction(shop.shopId, !shop.favorite)}
                    />
                ))}
            </div>
        </div>
    );
}
