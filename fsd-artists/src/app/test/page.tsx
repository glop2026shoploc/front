import { getCatalogueTestInfo, CatalogueStatusCard } from "@/entities/catalogue";

export default async function TestPage() {
    const data = await getCatalogueTestInfo();

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
            <h1 className="text-3xl font-bold">Test de connexion Catalogue</h1>
            <CatalogueStatusCard data={data} />
        </div>
    );
}