import { redirect } from "next/navigation";
import { getSessionClaims } from "@/entities/user";
import { routes } from "@/shared/config/routes";

export default async function Home() {
  const session = await getSessionClaims();
  redirect(session?.role === "CLIENT" ? routes.shops : routes.signUp);
}
