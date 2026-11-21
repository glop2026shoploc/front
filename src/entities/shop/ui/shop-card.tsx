import { MapPin } from "lucide-react";
import { formatDistance } from "@/shared/lib/geo";
import { Badge } from "@/shared/ui/badge";
import { buttonVariants } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { formatShopAddress, googleMapsDirectionsUrl } from "../lib/google-maps";
import type { Shop } from "../model/types";

interface ShopCardProps {
    shop: Shop;
    cityName: string;
    /** Distance entre la position de l'appareil et le commerce ; absente sans position partagée. */
    distanceFromMeKm?: number;
    categoryNames: string[];
}

export function ShopCard({ shop, cityName, distanceFromMeKm, categoryNames }: ShopCardProps) {
    const address = formatShopAddress(shop.address, cityName);

    return (
        <Card data-testid="shop-card">
            <CardHeader>
                <CardTitle>{shop.name}</CardTitle>
                <CardDescription>{address}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
                {distanceFromMeKm !== undefined && <Badge>à {formatDistance(distanceFromMeKm)} de vous</Badge>}
                {categoryNames.map((name) => (
                    <Badge key={name} variant="outline">
                        {name}
                    </Badge>
                ))}
            </CardContent>
            <CardFooter>
                <a
                    href={googleMapsDirectionsUrl(shop.name, address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                    <MapPin />
                    Itinéraire Google Maps
                </a>
            </CardFooter>
        </Card>
    );
}
