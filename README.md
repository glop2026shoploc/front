# front

## Installation

Après avoir cloné ce repo, installe les dépendances (shadcn/ui et Playwright sont inclus) :

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

L'app est disponible sur http://localhost:3000.

Autres commandes utiles :

```bash
npm run lint    # vérifie le code avec ESLint
npm run build   # build de production
npm run start   # lance le build de production
```

## Architecture : Feature-Sliced Design (FSD)

Le projet suit la méthodologie [Feature-Sliced Design](https://feature-sliced.design). Le code est organisé par **fonctionnalité métier**, pas par type technique (pas de dossier `components/`, `hooks/`... global). Ça évite le code spaghetti quand le projet grossit.

Tout le code vit dans `src/`, découpé en **layers** (couches), chacune pouvant être découpée en **slices** (domaines métier), chacune découpée en **segments** (technique : `ui`, `model`, `lib`, `api`, `config`).

### Les couches, de haut en bas

Une couche ne peut importer qu'une couche **strictement en dessous**, jamais une couche du même niveau ou au-dessus (sinon ça crée une dépendance circulaire impossible à tester).

```
app        → routage, layout global (src/app, pages.tsx / layout.tsx de Next.js)
widgets    → blocs d'UI autonomes réutilisés sur plusieurs pages (ex: header, liste)
features   → actions utilisateur avec leur propre logique (ex: recherche, filtre)
entities   → concepts métier : types, accès aux données (ex: commercant, produit, commande)
shared     → base commune sans logique métier : composants shadcn/ui, utils, config
```

Pour savoir où placer son code, se poser les questions dans l'ordre :

| Question | Couche |
|---|---|
| Le code ignore tout du métier ? | `shared/` |
| C'est une action utilisateur avec sa propre logique (filtrer, rechercher) ? | `features/` |
| C'est un bloc qui assemble plusieurs entités/features ? | `widgets/` |
| C'est une initialisation globale, une route, un layout ? | `app/` |
| Le code décrit un concept métier (une donnée qu'on affiche) ? | `entities/` |

`app` et `shared` n'ont pas de slices (pas de logique métier). Les autres couches ont des slices nommées par domaine métier ShopLoc (`commercant`, `produit`, `commande`, `client`, `fidelite`...).

### Les segments à l'intérieur d'un slice

```
commercant/
├── ui/        composants de présentation (1 composant par fichier, pas d'appel API ni de logique métier)
├── api/       appels réseau + conversion de la réponse vers les types du slice
├── model/     types.ts, queries.ts, hooks, données de test
├── lib/       fonctions utilitaires propres au slice
├── config/    constantes propres au slice (rare)
└── index.ts   API publique du slice
```

**Règle d'import : tout passe par `index.ts`.** Ce qui n'est pas ré-exporté dans `index.ts` est privé au slice.

```ts
// ✅ autorisé
import { CommercantCard } from "@/entities/commercant";

// ❌ interdit
import { CommercantCard } from "@/entities/commercant/ui/commercant-card";
```

### Exemple d'arborescence

Le glossaire métier et les epics (authentification, recherche de commerces, achat, retrait, stocks, fidélité client/commerçant, statistiques, RGPD), les slices doivent reprendre le vocabulaire de ShopLoc plutôt que des noms génériques :

```
src/
├── app/                           # routage Next.js (connexion, recherche, commerce, panier, compte...)
├── entities/
│   ├── client/                    # profil, statut VFP
│   ├── commercant/                # fiche commerce : nom, adresse, horaires, catégorie
│   ├── produit/                   # article/offre vendu par un commerçant
│   ├── commande/                  # commande click & collect
│   ├── panier/                    # panier en cours
│   ├── portefeuille/              # porte-monnaie électronique (solde, rechargement)
│   └── fidelite/                  # points, avantages/cadeaux, catalogue VFP
├── features/
│   ├── recherche-commercant/      # filtrer/chercher un commerçant par catégorie, distance...
│   ├── calcul-itineraire/         # itinéraire le plus court vers un commerçant
│   ├── gestion-panier/            # ajouter/retirer un article du panier
│   ├── paiement/                  # payer par CB, points ou QR-code portefeuille
│   └── gestion-stock/             # mise à jour des stocks par le commerçant
├── widgets/
│   ├── fiche-commercant/          # nom, horaires, produits, programme fidélité
│   ├── liste-commercants/
│   ├── carte-commercants/         # carte avec géolocalisation
│   └── resume-panier/
└── shared/
    ├── ui/                        # composants shadcn/ui
    ├── lib/
    └── config/
```

Cette arborescence est une cible à suivre pour les prochains développements ; elle s'aligne sur les entités citées dans le glossaire (client, commerçant, produit/article, commande, portefeuille, avantage, VFP) et sur les epics du backlog.

Pour ajouter un [composant](https://ui.shadcn.com/docs/components) shadcn/ui :

```bash
npx shadcn@latest add <nom-du-composant>
```

## Tests Playwright (E2E)

Les tests couvrent le parcours utilisateur de bout en bout, en **boîte noire** : on ne doit rien importer depuis `src/`, on teste ce que l'utilisateur voit, pas la façon dont le code est organisé. Chaque test doit être indépendant (pas d'ordre d'exécution ni d'état partagé entre tests).

Les tests vivent dans `e2e/` (hors de `src/`) :

```
e2e/
├── specs/           # scénarios utilisateurs : <feature>.spec.ts (1 fichier par parcours/feature)
├── page-objects/    # 1 fichier par route de src/app : <route>.page.ts
├── fixtures/        # branche les page-objects dans le test + réglages communs
│                     (ex: blocage des images externes)
└── mocks/           # serveurs de mock pour les APIs appelées pendant les tests
```

### Lancer les tests

```bash
npm run test:e2e
```

### Lancer les tests en mode debug

Ouvre l'inspecteur Playwright pour exécuter les tests pas à pas, inspecter le DOM et voir les actions en direct :

```bash
npm run test:e2e:debug
```

Pour déboguer un seul fichier de test :

```bash
npx playwright test e2e/specs/<fichier>.spec.ts --debug
```

### Écrire un nouveau test

1. Si la route n'a pas encore de page object, en créer un dans `e2e/page-objects/<route>.page.ts`.
2. Créer le scénario dans `e2e/specs/<feature>.spec.ts` en utilisant les fixtures (`e2e/fixtures/index.ts`) pour récupérer les page objects.
3. Ne jamais importer quoi que ce soit depuis `src/` dans un test.

La documentation [Playwright](https://playwright.dev/docs/writing-tests) peut nous aider à écrire nos tests.
