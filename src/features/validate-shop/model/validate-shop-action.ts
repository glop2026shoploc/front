"use server";

import { revalidatePath } from "next/cache";
import { updateShopStatus } from "@/entities/shop";

export async function validateShopAction(shopId: string, status: "VALIDATED" | "REJECTED") {
    await updateShopStatus(shopId, status);
    revalidatePath("/admin");
}
