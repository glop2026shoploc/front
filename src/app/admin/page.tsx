import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { getShopDocumentUrls, getWaitingShops, type Shop } from "@/entities/shop";
import { ValidateShopButtons } from "@/features/validate-shop";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export const metadata: Metadata = {
    title: `Validation des commerces - ${siteConfig.name}`,
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const shops = await getWaitingShops();

    const items: { shop: Shop; urls: string[] }[] = [];
    for (const shop of shops) {
        items.push({ shop, urls: await getShopDocumentUrls(shop.shopId) });
    }

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <h1 className="text-3xl font-bold">Commerces en attente de validation</h1>

            {items.length === 0 && <p className="text-muted-foreground">Aucun commerce en attente.</p>}

            {items.map(({ shop, urls }) => (
                <Card key={shop.shopId}>
                    <CardHeader>
                        <CardTitle>{shop.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 text-sm">
                        <p>SIRET : {shop.siret}</p>
                        <p>Adresse : {shop.address.number} {shop.address.road}</p>
                        <p>Pièces justificatives :</p>
                        <ul className="list-disc pl-6">
                            {urls.map((url, index) => (
                                <li key={url}>
                                    <a href={url} target="_blank" className="underline underline-offset-4">
                                        Pièce {index + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <ValidateShopButtons shopId={shop.shopId} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
