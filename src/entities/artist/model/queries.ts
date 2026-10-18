import { artists } from "./mock-data";
import type { Artist } from "./types";

export async function getArtists(): Promise<Artist[]> {
    return artists;
}

export async function getArtistById(id: string): Promise<Artist | undefined> {
    return artists.find((artist) => artist.id === id);
}