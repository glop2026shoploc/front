import { AlbumCard, type Album } from "@/entities/album";

export function AlbumList({ albums }: { albums: Album[] }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Albums</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </section>
    );
}