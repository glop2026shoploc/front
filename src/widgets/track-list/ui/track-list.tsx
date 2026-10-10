import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { formatDuration, type Track } from "@/entities/track";

interface TrackListProps {
    tracks: (Track & { albumTitle: string })[];
}

export function TrackList({ tracks }: TrackListProps) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Tous les titres</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Album</TableHead>
                        <TableHead className="text-right">Durée</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tracks.map((track, index) => (
                        <TableRow key={track.id}>
                            <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                            <TableCell>{track.title}</TableCell>
                            <TableCell className="text-muted-foreground">{track.albumTitle}</TableCell>
                            <TableCell className="text-right">{formatDuration(track.durationSec)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}