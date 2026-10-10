"use client";

import { useMemo, useState } from "react";
import type { Artist } from "@/entities/artist";

export function useArtistSearch(artists: Artist[]) {
    const [query, setQuery] = useState("");

    const filteredArtists = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return artists;
        return artists.filter((artist) =>
            artist.name.toLowerCase().includes(normalizedQuery)
        );
    }, [artists, query]);

    return { query, setQuery, filteredArtists };
}