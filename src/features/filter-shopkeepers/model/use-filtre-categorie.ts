"use client";

import { useState } from "react";
import type { Commercant } from "@/entities/commercant";

export function useFiltreCategorie(commercants: Commercant[]) {
    const [categorie, setCategorie] = useState("Toutes");

    let resultats = commercants;
    if (categorie !== "Toutes") {
        resultats = commercants.filter((commercant) => commercant.category === categorie);
    }

    return { categorie, setCategorie, resultats };
}
