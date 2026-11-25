import { Star } from "lucide-react";
import { cn } from "cn";

interface FavoriteIconProps {
    isFavorite: boolean;
    onClick: () => void;
}

export function FavoriteIcon({ isFavorite, onClick }: FavoriteIconProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="text-muted-foreground hover:text-yellow-500"
        >
            <Star className={cn("size-4", isFavorite && "fill-yellow-500 text-yellow-500")} />
        </button>
    );
}
