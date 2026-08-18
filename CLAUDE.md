# Serviotek — contexte du projet

Boutique e-commerce en Next.js 14 (App Router), déployée sur Vercel.
Dépôt : `chaoukkii28-coder/Serviotek-shop`.

Société éditrice : **Service**, SASU au capital de 50 €, RCS Paris 104 280 516,
siège Bureau 326, 59 rue de Ponthieu, 75008 Paris.

## Le domaine

Une seule source : `SITE_URL` dans `lib/site.ts`, alimentée par la variable
d'environnement `NEXT_PUBLIC_SITE_URL` et repliée sur `https://serviotek.com`
par défaut. Elle sert au sitemap, à robots.txt, aux données structurées, aux
liens de la facture Stripe et aux URLs absolues envoyées à Amazon.

Ne jamais réécrire un domaine en dur ailleurs : il l'était dans sept fichiers,
et le sitemap désignait alors un autre domaine que le site.

## Conventions

- **Design** : thème clair (la migration depuis le thème sombre est faite),
  accent lime (`volt`), header avec navigation par rayons et recherche.
  Couleurs dans `tailwind.config` : `graphite` #14151A (texte),
  `mist` #5B6169 (gris secondaire), `wire` #E4E6EB (bordures), `panel` #FFFFFF.
- **Lisibilité** : les textes produits sont en `graphite` et en gras ou
  semi-gras. Ne pas repasser les descriptions en `text-mist` : sur fond blanc,
  ce gris est trop pâle et illisible.
- **Contenu** : tout en français.
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
  d'illustration.
- **Stripe est en mode live** et la boutique encaisse. La facture de
  confirmation part automatiquement avec les mentions légales obligatoires.
- **Amazon** : compte « Xonto », marché France actif, vérification en cours.
  Zéro produit publié. Voir `docs/amazon-seller.md`.

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
