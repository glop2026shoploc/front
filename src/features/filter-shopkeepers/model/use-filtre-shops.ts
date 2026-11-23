"use client";

import { useState } from "react";
import type { Shop } from "@/entities/shop";

export function useFiltreShops(shops: Shop[]) {
    const [categoryId, setCategoryId] = useState("");
    const filteredShops = categoryId
        ? shops.filter((shop) => shop.category.categoryId === categoryId)
        : shops;

    return { categoryId, setCategoryId, filteredShops };
}
