import { albums } from "./mock-data";
import type { Album } from "./types";

export async function getAlbumsByArtist(artistId: string): Promise<Album[]> {
    return albums.filter((album) => album.artistId === artistId);
}