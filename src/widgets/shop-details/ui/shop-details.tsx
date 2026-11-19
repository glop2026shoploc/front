import { notFound } from "next/navigation";
import { getShop, getShopOpeningHours } from "@/entities/shop";
import { getShopProducts } from "@/entities/product";
import { getCities } from "@/entities/city";
import { getCategories } from "@/entities/category";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export async function ShopDetails({ shopId }: { shopId: string }) {
    const shop = await getShop(shopId);
    if (shop === null) {
        notFound();
    }

    const openingHours = await getShopOpeningHours(shopId);
    const products = await getShopProducts(shopId);
    const cities = await getCities();
    const categories = await getCategories();

    const cityName = cities.find((city) => city.id === shop.address.cityId)?.name ?? "";
    const categoryNames = categories.filter((category) => shop.categoryIds.includes(category.id)).map((category) => category.name);
    const productsPayableWithPoints = products.filter((product) => product.pointsPrice !== null).length;

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <div className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {categoryNames.join(" · ")}
                </p>
                <h1 className="font-heading text-2xl leading-snug font-medium">{shop.name}</h1>
                <p className="text-sm text-muted-foreground">
                    {shop.address.number} {shop.address.road}
                    {shop.address.complement && `, ${shop.address.complement}`}, {cityName}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="[--card-spacing:--spacing(6)]">
                    <CardHeader>
                        <CardTitle className="text-lg">Horaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {openingHours.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Horaires non renseignés.</p>
                        ) : (
                            <Table>
                                <TableBody>
                                    {days.map((day, index) => {
                                        const slots = openingHours.filter((hours) => hours.dayOfWeek === index + 1);
                                        return (
                                            <TableRow key={day}>
                                                <TableCell>{day}</TableCell>
                                                <TableCell className="text-right">
                                                    {slots.length === 0
                                                        ? "Fermé"
                                                        : slots.map((slot) => `${slot.openTime.slice(0, 5)} - ${slot.closeTime.slice(0, 5)}`).join(", ")}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <Card className="[--card-spacing:--spacing(6)]">
                    <CardHeader>
                        <CardTitle className="text-lg">Programme de fidélité</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2 text-sm">
                        <p>Ce commerce fait partie du programme de fidélité de {cityName}.</p>
                        <p>Chaque euro dépensé vous rapporte 1 point, sauf pour les articles qui ont leur propre barème.</p>
                        <p>
                            {productsPayableWithPoints === 0
                                ? "Aucun article ne peut encore être payé avec vos points."
                                : `${productsPayableWithPoints} article(s) peuvent être payés avec vos points.`}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="[--card-spacing:--spacing(6)]">
                <CardHeader>
                    <CardTitle className="text-lg">Produits en vente</CardTitle>
                </CardHeader>
                <CardContent>
                    {products.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Aucun produit en vente pour le moment.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produit</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead>Prix en points</TableHead>
                                    <TableHead>Points gagnés</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.productId}>
                                        <TableCell>
                                            {product.name}
                                            {product.quantity === 0 && (
                                                <Badge variant="outline" className="ml-2">Rupture de stock</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{euros.format(product.price)}</TableCell>
                                        <TableCell>{product.pointsPrice === null ? "-" : `${product.pointsPrice} pts`}</TableCell>
                                        <TableCell>{product.earnedPoints > 0 ? `+${product.earnedPoints} pts` : "1 pt / €"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
