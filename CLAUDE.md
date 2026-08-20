# Serviotek — contexte du projet

Boutique e-commerce en Next.js 14 (App Router), déployée sur Vercel.
Dépôt : `chaoukkii28-coder/Serviotek-shop`.

Société éditrice : **Service**, SASU au capital de 50 €, RCS Paris 104 280 516,
siège Bureau 326, 59 rue de Ponthieu, 75008 Paris.

## Le domaine

Une seule source : `SITE_URL` dans `lib/site.ts`, alimentée par la variable
d'environnement `NEXT_PUBLIC_SITE_URL` et repliée sur `https://www.serviotek.com`
par défaut — **le `www` est la forme canonique**, `serviotek.com` y redirige. Elle sert au sitemap, à robots.txt, aux données structurées, aux
liens de la facture Stripe et aux URLs absolues envoyées à Amazon.

Ne jamais réécrire un domaine en dur ailleurs : il l'était dans sept fichiers,
et le sitemap désignait alors un autre domaine que le site.

## Conventions

- **Design** : direction "boutique dense" type marketplace (refonte complète,
  toutes les pages migrées). Fond de page `fond` #eef0ec, cartes `panel`/blanc,
  header et footer sombres (`encre` #16181a). Deux accents seulement : `vert`
  (`oklch(0.52 0.13 158)`, actions/boutons) et `violet`
  (`oklch(0.48 0.17 295)`, prix/liens/promos) — ne pas en ajouter un troisième.
  Polices Space Grotesk (titres/texte) et Space Mono (prix, labels
  majuscules, mentions), via `next/font/google` dans `app/layout.tsx`.
  Tous les nouveaux tokens de couleur sont dans `tailwind.config.ts`
  (`fond`, `encre`, `grisTexte`, `grisDiscret`, `grisLabel`, `vert`,
  `vertClair`, `vertTexteSombre`, `violet`, `bordureChamp`, `bordureSep`,
  `bordureGrille`, `carteSombre`, `boutonNav`, `sepSombre`, `clairMuted`,
  `creme`). Les anciens tokens (`graphite`, `mist`, `wire`, `panel`, `volt`)
  restent déclarés mais ne sont plus utilisés dans les pages — coexistence
  volontaire pendant la migration, à nettoyer si plus aucune page ne s'en sert.
  Les couleurs de rayon (`couleur` dans `lib/categories.ts`, ex. `bg-sky-500`)
  ne sont plus affichées nulle part depuis cette refonte (design plus dense,
  sans pastilles colorées) — champ inutilisé, pas un bug.
- **Aucune ombre, aucune media query** : le responsive repose sur
  `repeat(auto-fit/auto-fill, minmax(...))`, `clamp()` et `flex-wrap`.
- **Lisibilité** : texte en `grisTexte`/`encre`, jamais un gris plus pâle sur
  fond blanc (même piège que l'ancien `text-mist`, déjà rencontré deux fois).
- **Contenu** : tout en français. Vouvoiement sur les pages ajoutées lors de
  la refonte (à propos, contact, confirmation, compte) ; le tutoiement plus
  ancien peut subsister ailleurs.
- **Ne jamais annoncer une livraison plus large que ce que Stripe collecte
  réellement** (`app/api/checkout/route.ts`, `shipping_address_collection`) :
  aujourd'hui France, Belgique, Suisse, Luxembourg uniquement. Une mention
  "livraison dans le monde entier" avait été introduite par erreur lors de la
  refonte (copiée telle quelle depuis une maquette) puis corrigée.
- **Prix** : fixés à partir du **coût d'achat fournisseur**, généralement × 2.
  Certaines références ont un prix de vente fixé directement. Attention :
  l'historique contient d'anciens multiplicateurs (× 3, puis × 2) — ne jamais
  multiplier les prix affichés, ils intègrent déjà une marge.
- **Conformité** : bandeau cookies, CGV, mentions légales, politique de
  confidentialité et formulaire type de rétractation (`/retractation`) sont en
  place. La mention du capital social est **obligatoire** (LCEN art. 6 III 1°) :
  ne pas la retirer.

## Règles de travail

- **Toujours vérifier le build** : `npx tsc --noEmit` puis `npm run build` avant
  de committer. Des erreurs de build sont passées en production par le passé.
- **Toujours fusionner sur `main`** après avoir poussé. Le site se déploie
  depuis `main` : un travail poussé sur une branche seule n'arrive jamais en
  ligne, et l'erreur a déjà été commise.
- **Ne pas casser le thème clair** existant.

## État du site

- **13 produits**, tous des gadgets électriques. La collection scolaire a été
  retirée (récupérable : `git show 8fc9e36^:lib/products-scolaire.ts`).
- **7 produits ont de vraies photos**, recadrées au format Amazon (1600 px,
  fond blanc) dans `public/images-amazon`. Les autres tournent sur des visuels
  d'illustration ou des URLs externes CJ Dropshipping/Unsplash (déjà
  couvertes par `images.remotePatterns` dans `next.config`).
- **Stripe est en mode live** et la boutique encaisse. La facture de
  confirmation part automatiquement (webhook `app/api/webhook-stripe`,
  déclenche `stripe.invoices.sendInvoice`), et la page de confirmation
  affiche aussi la commande + le lien facture directement.
- **Avis clients** : système sur site (pas de redirection externe), étoiles
  sur la fiche produit, vérification d'achat via les métadonnées Stripe.
  Nécessite `DATABASE_URL`/`POSTGRES_URL` (Neon, déjà connecté en prod).
- **Comptes clients** : inscription/connexion par e-mail + mot de passe
  (`lib/compte-db.ts`, `lib/session.ts`), historique de commandes rattaché
  par e-mail. Nécessite `SESSION_SECRET` (déjà configuré en prod).
- **Amazon** : compte « Xonto », marché France actif, vérification terminée
  (compte sain). Zéro produit publié pour l'instant — bloqué sur le code
  EAN/GTIN de chaque référence. Voir `docs/amazon-seller.md`.
- **Pages** : accueil, fiche produit, catalogue/rayon (`/produit`), panier,
  compte, à propos, contact, confirmation de commande, et les pages légales
  (livraison, retours, rétractation, CGV, mentions légales, confidentialité)
  — toutes migrées vers le nouveau système visuel. Le formulaire de contact
  ouvre le client mail du visiteur (aucun service d'envoi d'e-mails
  configuré côté serveur pour l'instant).

## Documentation

| Fichier | Contenu |
| --- | --- |
| `docs/a-faire.md` | les étapes qui ne peuvent être faites que par le propriétaire |
| `docs/amazon-seller.md` | publier le catalogue sur Amazon Seller Central |
| `docs/conformite-sasu.md` | audit légal du site et ce qui manque |
| `docs/avis-clients.md` | recueillir des avis, et ce que la loi interdit |

## Tâches en attente

- Remplacer les visuels d'illustration par de vraies photos produits (6 sur 13)
- Ajouter des badges de catégorie
- Intégrer l'API CJ Dropshipping via les webhooks Stripe
- Configurer Google Search Console (le sitemap existe déjà et couvre les pages
  légales)
- Refondre la mise en page du catalogue

## Tâches obsolètes

- `ConnectionBackground.tsx` : le composant a été **supprimé** au commit
  `1e03712`, remplacé par un fond blanc. Il n'y a rien à terminer.
