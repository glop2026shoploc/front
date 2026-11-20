"use client";

import type { CategorieCommercant, Commercant } from "@/entities/commercant";
import { FiltreCategorie, useFiltreCategorie } from "@/features/filter-shopkeepers";

export function ListeCommercants({ commercants, categories }: {
    commercants: Commercant[];
    categories: CategorieCommercant[];
}) {
    const { categorieId, filtrerParCategorie, commercants: resultats, erreur } = useFiltreCategorie(commercants);

    return (
        <section className="flex flex-col gap-6">
            <FiltreCategorie value={categorieId} categories={categories} onChange={filtrerParCategorie} />
            {erreur && <p role="alert">{erreur}</p>}
            {resultats.length === 0 ? (
                <p role="status">Aucun commerçant dans cette catégorie.</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resultats.map((commercant) => (
                        <li key={commercant.shopId} className="rounded-xl border bg-card p-4 shadow-sm">
                            <h2 className="font-semibold">{commercant.name}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{commercant.category.name}</p>
                            <p className="mt-2 text-sm">{commercant.address.number} {commercant.address.road}</p>
                            {commercant.address.complement && <p className="text-sm">{commercant.address.complement}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
