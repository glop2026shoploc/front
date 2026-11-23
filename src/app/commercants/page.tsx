import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCategories, type Category } from "@/entities/category";
import { getCities } from "@/entities/city";
import { getShopsByCity, type Shop } from "@/entities/shop";
import { getSessionClaims } from "@/entities/user";
import { routes } from "@/shared/config/routes";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { ShopList } from "@/widgets/shop-list";

export const metadata: Metadata = { title: "Commerçants de votre ville" };

/**
 * Commerçants de la ville du client connecté. La ville vient du compte (claim `cityId` du JWT) :
 * le client ne choisit pas la ville affichée.
 */
export default async function CommercantsPage() {
    const session = await getSessionClaims();
    if (!session) {
        redirect(routes.signIn);
    }

    if (session.role !== "CLIENT" || !session.cityId) {
        return (
            <Layout>
                <Alert>
                    <AlertTitle>Page réservée aux clients</AlertTitle>
                    <AlertDescription>
                        La liste des commerçants s’affiche pour la ville de votre compte client.
                    </AlertDescription>
                </Alert>
            </Layout>
        );
    }

    let cityName: string | undefined;
    let shops: Shop[];
    let categories: Category[];
    try {
        const [cities, cityShops, allCategories] = await Promise.all([
            getCities(),
            getShopsByCity(session.cityId),
            getCategories(),
        ]);
        cityName = cities.find((city) => city.id === session.cityId)?.name;
        shops = cityShops;
        categories = allCategories;
    } catch {
        return (
            <Layout>
                <Alert variant="destructive">
                    <AlertDescription>Impossible de charger les commerçants pour le moment.</AlertDescription>
                </Alert>
            </Layout>
        );
    }

    if (!cityName) {
        return (
            <Layout>
                <Alert variant="destructive">
                    <AlertDescription>La ville de votre compte est introuvable.</AlertDescription>
                </Alert>
            </Layout>
        );
    }

    const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

    return (
        <Layout>
            <p className="text-sm text-muted-foreground" role="status">
                {shops.length} commerçant{shops.length > 1 ? "s" : ""} à {cityName}
            </p>
            <ShopList
                categories={categories}
                items={shops.map((shop) => ({
                    shop,
                    cityName,
                    categoryNames: [categoryNameById.get(shop.category.categoryId)]
                        .filter((name): name is string => name !== undefined),
                }))}
            />
        </Layout>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Commerçants de votre ville</h1>
                <p className="text-sm text-muted-foreground">
                    Les commerçants partenaires de votre ville, avec leur distance si vous partagez votre position.
                </p>
            </div>
            {children}
        </div>
    );
}
