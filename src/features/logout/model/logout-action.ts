"use server";
import { clearSession } from "@/entities/user";
import { routes } from "@/shared/config/routes";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await clearSession();
    redirect(routes.home);
}
