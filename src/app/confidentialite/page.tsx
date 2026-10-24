import Link from "next/link";

export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-800">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        {/* En-tête */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Shopping Local
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Conditions Générales d’Utilisation
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 24 octobre 2026
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            Les présentes Conditions Générales d’Utilisation (CGU) encadrent l’accès et l’utilisation de la plateforme et de l’application Shopping Local. Elles garantissent la transparence du service ainsi que le traitement licite de vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </div>

        {/* Sommaire */}
        <nav
          aria-label="Sommaire des conditions générales d’utilisation"
          className="mb-10 rounded-xl bg-gray-50 p-5"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Sommaire
          </h2>

          <ol className="list-inside list-decimal space-y-2 text-sm text-gray-600">
            <li><a className="hover:text-blue-600" href="#objet">Objet et présentation du service</a></li>
            <li><a className="hover:text-blue-600" href="#definitions">Définitions</a></li>
            <li><a className="hover:text-blue-600" href="#acces">Accès au service et disponibilité</a></li>
            <li><a className="hover:text-blue-600" href="#compte">Création et sécurité du compte</a></li>
            <li><a className="hover:text-blue-600" href="#commandes">Services Catalogue et Commandes</a></li>
            <li><a className="hover:text-blue-600" href="#donnees">Consentement et Traitement des Données (RGPD)</a></li>
            <li><a className="hover:text-blue-600" href="#responsabilite">Limitation de responsabilité</a></li>
            <li><a className="hover:text-blue-600" href="#propriete">Propriété intellectuelle</a></li>
            <li><a className="hover:text-blue-600" href="#suspension">Suspension et résiliation de compte</a></li>
            <li><a className="hover:text-blue-600" href="#droit">Droit applicable et Mentions légales</a></li>
          </ol>
        </nav>

        <div className="space-y-10">
          <section id="objet" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 1 — Objet et présentation du service
            </h2>
            <p className="leading-7 text-gray-600">
              Shopping Local est une plateforme numérique conçue dans le cadre d’un projet étudiant pour mettre en relation des consommateurs et des commerçants de proximité.
            </p>
          </section>

          <section id="definitions" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 2 — Définitions
            </h2>
            <ul className="list-inside list-disc space-y-2 leading-7 text-gray-600">
              <li>
                <strong>Plateforme / Application :</strong> L’ensemble des services applicatifs web et mobiles exploités sous la marque Shopping Local.
              </li>
              <li>
                <strong>Utilisateur / Client :</strong> Toute personne physique accédant au service et/ou titulaire d’un compte client.
              </li>
              <li>
                <strong>Commerçant Partenaire :</strong> Tout professionnel référencé proposant ses produits à la vente via la plateforme.
              </li>
            </ul>
          </section>

          <section id="acces" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 3 — Accès au service et disponibilité
            </h2>
            <p className="leading-7 text-gray-600">
              L’accès à cette version de démonstration dépend de la disponibilité des services du projet. Des interruptions peuvent survenir pendant le développement et la maintenance.
            </p>
          </section>

          <section id="compte" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 4 — Création et sécurité du compte
            </h2>
            <p className="leading-7 text-gray-600">
              L’accès à certaines fonctionnalités nécessite la création d’un compte utilisateur. L’utilisateur fournit son nom, son prénom, son e-mail et un mot de passe. Le service Users enregistre le mot de passe sous forme hachée avec BCrypt, et non en clair.
            </p>
          </section>

          <section id="commandes" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 5 — Services Catalogue et Commandes
            </h2>
            <p className="leading-7 text-gray-600">
              Les fiches produits et disponibilités sont actualisées en temps réel par les Commerçants Partenaires. La validation d’un panier constitue une commande ferme auprès du commerçant sélectionné.
            </p>
          </section>

          <section id="donnees" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 6 — Vos données personnelles (RGPD)
            </h2>
            <p className="leading-7 text-gray-600">
              Pour l’inscription, le service Users reçoit le nom, le prénom, l’adresse e-mail, le mot de passe et le choix de consentement. Ces informations servent à créer le compte et à permettre l’authentification.
            </p>
            <p className="mt-3 leading-7 text-gray-600">
              Dans cette version du projet, le choix exprimé dans la case de consentement est enregistré avec le compte. Les informations disponibles sur leur utilisation sont présentées dans la politique de confidentialité.
            </p>
            <p className="mt-3 leading-7 text-gray-600">
              Les informations sur la confidentialité et les points qui restent à définir pour le projet figurent dans notre{" "}
              <Link
                href="/politique-confidentialite"
                className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
              >
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section id="responsabilite" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 7 — Limitation de responsabilité
            </h2>
            <p className="leading-7 text-gray-600">
              Shopping Local intervient en qualité d’intermédiaire technique de mise en relation. La responsabilité liée à la conformité des produits, à la préparation des commandes et au respect du droit de rétractation incombe directement au Commerçant Partenaire vendeur.
            </p>
          </section>

          <section id="propriete" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 8 — Propriété intellectuelle
            </h2>
            <p className="leading-7 text-gray-600">
              La marque Shopping Local, les logos, interfaces, chartes graphiques et développements logiciels associés sont la propriété exclusive de la société Shopping Local SAS. Toute reproduction ou exploitation non autorisée est strictement interdite.
            </p>
          </section>

          <section id="suspension" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 9 — Suspension et résiliation de compte
            </h2>
            <p className="leading-7 text-gray-600">
              Shopping Local se réserve le droit de suspendre ou de fermer l’accès à tout compte utilisateur en cas de manquement aux présentes CGU ou d’utilisation frauduleuse des services.
            </p>
          </section>

          <section id="droit" className="scroll-mt-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Article 10 — Droit applicable et Mentions légales
            </h2>
            <p className="leading-7 text-gray-600">
              Les présentes conditions sont proposées pour un projet étudiant. L’identité juridique de l’éditeur et les coordonnées officielles restent à confirmer avant toute utilisation réelle.
            </p>
            <p className="mt-3 leading-7 text-gray-600">
              Les coordonnées de contact officielles restent à définir par l’équipe du projet.
            </p>
          </section>
        </div>

        {/* Pied de page */}
        <footer className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-sm leading-6 text-gray-500">
            Ce document encadre l’utilisation des services Shopping Local et décrit le traitement de vos données pour le projet (US-1102).
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/inscription"
              className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
            >
              Retour à l’inscription
            </Link>

            <Link
              href="/politique-confidentialite"
              className="font-medium text-gray-600 underline underline-offset-4 hover:text-gray-900"
            >
              Politique de confidentialité
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
