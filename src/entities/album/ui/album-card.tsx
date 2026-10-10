import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Album } from "../model/types";

export function AlbumCard({ album }: { album: Album }) {
    return (
        <Card>
            <CardHeader>
                <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="aspect-square w-full rounded-md object-cover"
                />
            </CardHeader>
            <CardContent>
                <CardTitle className="text-base">{album.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{album.year}</p>
            </CardContent>
        </Card>
    );
}