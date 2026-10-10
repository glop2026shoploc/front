import type { Artist } from "@/entities/artist";

export function ArtistHeader({ artist }: { artist: Artist }) {
    return (
        <header className="flex items-center gap-6">
            <img
                src={artist.imageUrl}
                alt={artist.name}
                className="h-32 w-32 rounded-full object-cover"
            />
            <div>
                <h1 className="text-3xl font-bold">{artist.name}</h1>
                <p className="text-muted-foreground">{artist.genre}</p>
            </div>
        </header>
    );
}