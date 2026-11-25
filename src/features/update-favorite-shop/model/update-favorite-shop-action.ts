"use server";

import { revalidatePath } from "next/cache";
import { setShopFavorite } from "@/entities/shop";
import { routes } from "@/shared/config/routes";

export async function updateFavoriteShopAction(shopId: string, isFavorite: boolean) {
    await setShopFavorite(shopId, isFavorite);
    revalidatePath(routes.shops);
}
