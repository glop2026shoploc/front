import { getArtists } from "@/entities/artist";
import { ArtistList } from "@/widgets/artist-list";

export default async function ArtistsPage() {
    const artists = await getArtists();

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <h1 className="text-3xl font-bold">Artistes</h1>
            <ArtistList artists={artists} />
        </div>
    );
}