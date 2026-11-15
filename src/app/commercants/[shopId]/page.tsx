import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { ShopDetails } from "@/widgets/shop-details";

export const metadata: Metadata = {
    title: `Fiche commerçant - ${siteConfig.name}`,
};

export const dynamic = "force-dynamic";

interface ShopPageProps {
    params: Promise<{ shopId: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
    const { shopId } = await params;

    return <ShopDetails shopId={shopId} />;
}
