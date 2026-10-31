import Link from "next/link";

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Politique de confidentialité</h1>
      <p className="mb-4">
        Cette page décrit les données demandées lors de la création d’un compte
        Shopping Local et l’usage prévu dans le cadre de ce projet.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Données et utilisation</h2>
      <p>
        Le service Users reçoit votre prénom, votre nom, votre adresse e-mail,
        votre mot de passe et votre choix de consentement. Ces données servent à
        créer le compte et permettre l’authentification. Le mot de passe est
        enregistré sous forme encodée.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Consentement</h2>
      <p>
        Pour cette version du projet, le choix donné à l’inscription est enregistré
        avec le compte. Sans consentement, l’API refuse la création du compte.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Informations à compléter</h2>
      <p>
        Les responsables du traitement, la durée de conservation, les destinataires
        précis et les modalités d’exercice des droits doivent être définis par
        l’équipe du projet. Cette page est une information de démonstration et ne
        constitue pas une politique juridique validée.
      </p>
      <Link href="/inscription" className="mt-8 inline-block underline">
        Retour à l’inscription
      </Link>
    </main>
  );
}
