"use client";

import type { Commercant } from "@/entities/commercant";
import { FiltreCategorie, useFiltreCategorie } from "@/features/filter-shopkeepers";

export function ListeCommercants({ commercants }: { commercants: Commercant[] }) {
    const { categorie, setCategorie, resultats } = useFiltreCategorie(commercants);

    return (
        <section className="flex flex-col gap-6">
            <FiltreCategorie value={categorie} onChange={setCategorie} />
            {resultats.length === 0 ? (
                <p role="status">Aucun commerçant dans cette catégorie.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resultats.map((commercant) => (
                        <li key={commercant.id} className="rounded-xl border bg-card p-4 shadow-sm">
                            <h2 className="font-semibold">{commercant.name}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{commercant.category}</p>
                            <p className="mt-2 text-sm">{commercant.address}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
