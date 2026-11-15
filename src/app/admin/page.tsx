import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { ShopValidation } from "@/widgets/shop-validation";

export const metadata: Metadata = {
    title: `Validation des commerces - ${siteConfig.name}`,
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
    return <ShopValidation />;
}
