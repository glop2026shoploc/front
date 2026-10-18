import { tracks } from "./mock-data";
import type { Track } from "./types";

export async function getTracksByAlbum(albumId: string): Promise<Track[]> {
    return tracks
        .filter((track) => track.albumId === albumId)
        .sort((a, b) => a.trackNumber - b.trackNumber);
}