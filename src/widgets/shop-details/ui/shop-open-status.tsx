"use client";

import { useEffect, useState } from "react";
import type { OpeningHours } from "@/entities/shop";
import { Badge } from "@/shared/ui/badge";

export function ShopOpenStatus({ openingHours }: { openingHours: OpeningHours[] }) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (now === null) {
        return null;
    }

    const day = now.getDay() === 0 ? 7 : now.getDay();
    const time = now.toTimeString().slice(0, 8);
    const isOpen = openingHours.some((hours) => hours.dayOfWeek === day && hours.openTime <= time && time < hours.closeTime);

    return <Badge variant={isOpen ? "default" : "outline"}>{isOpen ? "Ouvert" : "Fermé"}</Badge>;
}
