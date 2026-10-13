import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Artist } from "../model/types";

export function ArtistCard({ artist }: { artist: Artist }) {
    return (
        <Link href={`/artists/${artist.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                    <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="aspect-square w-full rounded-md object-cover"
                    />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-base">{artist.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{artist.genre}</p>
                </CardContent>
            </Card>
        </Link>
    );
}