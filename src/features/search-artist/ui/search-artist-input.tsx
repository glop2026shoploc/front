"use client";

import { Input } from "@/shared/ui/input";

interface SearchArtistsInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchArtistInput({ value, onChange }: SearchArtistsInputProps) {
    return (
        <Input
            type="search"
            placeholder="Rechercher un artiste..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="max-w-sm"
            aria-label="Rechercher un artiste"
        />
    );
}