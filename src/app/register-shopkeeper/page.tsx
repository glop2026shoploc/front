import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card";

export default function InscriptionCommercantPage() {

    return (
        <>
            <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Inscription commerçant</CardTitle>
                        <CardDescription>
                            Créez votre compte pour proposer vos offres et fidéliser vos clients.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/*<RegisterCommercantForm />*/}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}