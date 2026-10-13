"use server";

import { revalidatePath } from "next/cache";
import { updateCatalogueMessage } from "@/entities/catalogue";

export async function updateCatalogueAction(formData: FormData) {
    const message = formData.get("message");
    if (typeof message !== "string" || message.trim() === "") return;

    await updateCatalogueMessage(message);
    revalidatePath("/test");
}