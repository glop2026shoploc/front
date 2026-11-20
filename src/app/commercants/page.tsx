import { getCategoriesCommercants, getCommercants, type CategorieCommercant, type Commercant } from "@/entities/commercant";
import { ListeCommercants } from "@/widgets/shopkeeper-list";

export default async function CommercantsPage() {
    let commercants: Commercant[] = [];
    let categories: CategorieCommercant[] = [];
    let erreur = "";

    try {
        commercants = await getCommercants();
        categories = await getCategoriesCommercants();
    } catch {
        erreur = "Impossible de charger les commerçants. Vérifie que le Gateway et Catalogue sont démarrés.";
    }

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <h1 className="text-3xl font-bold">Commerçants</h1>
            {erreur ? <p role="alert">{erreur}</p> : <ListeCommercants commercants={commercants} categories={categories} />}
        </div>
    );
}
