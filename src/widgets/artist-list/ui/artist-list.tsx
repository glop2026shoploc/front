"use client";

import { ArtistCard, type Artist } from "@/entities/artist";
import { useArtistSearch, SearchArtistInput } from "@/features/search-artist";

export function ArtistList({ artists }: { artists: Artist[] }) {
    const { query, setQuery, filteredArtists } = useArtistSearch(artists);

    return (
        <div className="flex flex-col gap-6">
            <SearchArtistInput value={query} onChange={setQuery} />

            {filteredArtists.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Aucun artiste ne correspond à « {query} ».
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {filteredArtists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>
            )}
        </div>
    );
}