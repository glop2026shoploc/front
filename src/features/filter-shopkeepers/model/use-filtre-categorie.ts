"use client";

import { useState } from "react";
import { getCommercants, type Commercant } from "@/entities/commercant";

export function useFiltreCategorie(commercantsInitiaux: Commercant[]) {
    const [categorieId, setCategorieId] = useState("");
    const [commercants, setCommercants] = useState(commercantsInitiaux);
    const [erreur, setErreur] = useState("");

    async function filtrerParCategorie(id: string) {
        setCategorieId(id);
        setErreur("");

        try {
            setCommercants(await getCommercants(id || undefined));
        } catch {
            setErreur("Impossible de charger les commerçants.");
            setCommercants([]);
        }
    }

    return { categorieId, filtrerParCategorie, commercants, erreur };
}
