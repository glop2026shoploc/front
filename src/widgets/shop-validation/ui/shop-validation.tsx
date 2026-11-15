import { getShopDocumentUrls, getWaitingShops, type Shop } from "@/entities/shop";
import { ValidateShopButtons } from "@/features/validate-shop";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export async function ShopValidation() {
    const shops = await getWaitingShops();

    const items: { shop: Shop; urls: string[] }[] = [];
    for (const shop of shops) {
        items.push({ shop, urls: await getShopDocumentUrls(shop.shopId) });
    }

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <div className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Espace administrateur
                </p>
                <h1 className="font-heading text-2xl leading-snug font-medium">Commerces en attente</h1>
            </div>

            {items.length === 0 && <p className="text-sm text-muted-foreground">Aucun commerce en attente.</p>}

            {items.map(({ shop, urls }) => (
                <Card key={shop.shopId} className="[--card-spacing:--spacing(6)]">
                    <CardHeader>
                        <CardTitle className="text-lg">{shop.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 text-sm">
                        <p>
                            <span className="text-muted-foreground">SIRET : </span>
                            {shop.siret}
                        </p>
                        <p>
                            <span className="text-muted-foreground">Adresse : </span>
                            {shop.address.number} {shop.address.road}
                        </p>
                        <p className="text-muted-foreground">Pièces justificatives :</p>
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
