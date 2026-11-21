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
      <h2 className="mb-2 mt-6 text-xl font-semibold">Responsable du traitement</h2>
      <p>
        Le responsable du traitement est ShopLoc. Entre-Prises développe et
        héberge l’application pour ShopLoc. Pour toute question sur vos données,
        vous pouvez écrire à contact@shoploc.example.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Durée de conservation</h2>
      <p>Vos données sont conservés tant que votre compte est actif, puis seront supprimés 3 ans
          après votre dernière activité. Vous pouvez demander la suppression de votre compte à tout moment
          en écrivant à contact@shoploc.fr.
          Après la suppression de votre compte, nous pouvons conserver des informations
          anonymisées, uniquement pour établir des statistiques. Elles ne permettent plus de vous identifier, ni
          directement ni indirectement.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Destinataires</h2>
      <p>
        Vos données sont enregistrées uniquement dans le service Users. Les
        autres services de l’application ne gardent que l’identifiant de votre
        compte. Elles sont hébergées sur un serveur de l’université, en France,
        et ne sont pas transférées hors de l’Union européenne. Elles ne sont pas
        vendues ni transmises à des partenaires commerciaux. Seuls les services
        externes décrits ci-dessous reçoivent certaines informations.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Localisation et services externes</h2>
      <p className="mb-3">
        <strong>Adresse d’un commerce.</strong> Quand un commerçant saisit l’adresse
        de son commerce à l’inscription, le texte tapé est envoyé directement par
        son navigateur au service de géocodage de la Géoplateforme de l’IGN
        (Institut national de l’information géographique et forestière, organisme
        public français), avec son adresse IP comme pour toute requête web. Ce
        service renvoie des suggestions d’adresses et leurs coordonnées
        géographiques, enregistrées avec le commerce pour calculer sa distance.
        Voir la{" "}
        <a
          href="https://cartes.gouv.fr/donnees-personnelles"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          politique de données personnelles de la Géoplateforme
        </a>
        .
      </p>
      <p className="mb-3">
        <strong>Votre position.</strong> Sur la page des commerçants, votre
        position n’est demandée que si vous cliquez sur « Utiliser ma position »,
        et votre navigateur vous demande alors votre accord. Elle sert uniquement
        à calculer la distance jusqu’aux commerçants, sur votre appareil : elle
        n’est ni envoyée à nos serveurs ni enregistrée.
      </p>
      <p>
        <strong>Itinéraires.</strong> Le lien « Itinéraire Google Maps » ouvre
        Google Maps avec l’adresse du commerçant. Les données que vous partagez
        ensuite avec Google relèvent de la politique de confidentialité de Google.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold">Vos droits</h2>
      <p>
        Vous pouvez demander à consulter vos données, à les corriger ou à les
        supprimer. Vous pouvez aussi vous opposer à leur utilisation, en
        demander la limitation ou les récupérer dans un fichier. Pour cela,
        écrivez à contact@shoploc.example, une réponse vous sera donnée dans un
        délai d’un mois. La modification et la suppression du compte depuis
        l’application seront ajoutées dans une prochaine version. Si vous pensez
        que vos droits ne sont pas respectés, vous pouvez faire une réclamation
        auprès de la CNIL.
      </p>
      <Link href="/inscription" className="mt-8 inline-block underline">
        Retour à l’inscription
      </Link>
    </main>
  );
}
