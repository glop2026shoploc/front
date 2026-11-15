"use server";

import { revalidatePath } from "next/cache";
import { updateShopStatus } from "@/entities/shop";
import { routes } from "@/shared/config/routes";

export async function validateShopAction(shopId: string, status: "VALIDATED" | "REJECTED") {
    await updateShopStatus(shopId, status);
    revalidatePath(routes.admin);
}
