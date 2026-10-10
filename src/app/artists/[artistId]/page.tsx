import { notFound } from "next/navigation";
import { getArtistById } from "@/entities/artist";
import { getAlbumsByArtist } from "@/entities/album";
import { getTracksByAlbum } from "@/entities/track";
import { ArtistHeader } from "@/widgets/artist-header";
import { AlbumList } from "@/widgets/album-list";
import { TrackList } from "@/widgets/track-list";

interface ArtistPageProps {
    params: Promise<{ artistId: string }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
    const { artistId } = await params;

    const artist = await getArtistById(artistId);
    if (!artist) notFound();

    const albums = await getAlbumsByArtist(artist.id);
    const tracksByAlbum = await Promise.all(
        albums.map(async (album) => ({
            album,
            tracks: await getTracksByAlbum(album.id),
        }))
    );
    const allTracks = tracksByAlbum.flatMap(({ album, tracks }) =>
        tracks.map((track) => ({ ...track, albumTitle: album.title }))
    );

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10">
            <ArtistHeader artist={artist} />
            <AlbumList albums={albums} />
            <TrackList tracks={allTracks} />
        </div>
    );
}