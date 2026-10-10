import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card";
import type { CatalogueTestInfo } from "../model/types";
import {Button} from "@/shared/ui/button";

export function CatalogueStatusCard({ data }: { data: CatalogueTestInfo }) {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Statut du service Catalogue</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
                <p>
                    <span className="text-muted-foreground">Requêtes depuis le démarrage : </span>
                    <span className="font-medium">{data.numberOfTestRequestSinceBeginning}</span>
                </p>
                <p>{data.testMessage1}</p>
                <p>{data.testMessage2}</p>
            </CardContent>
            <CardFooter><Button variant="outline">Rafraîchir</Button></CardFooter>
        </Card>
    );
}