# Serviotek — contexte du projet

Boutique e-commerce en Next.js 14 (App Router), déployée sur Vercel.
Dépôt : `chaoukkii28-coder/Serviotek-shop`.

Société éditrice : **Service**, SASU au capital de 50 €, RCS Paris 104 280 516,
siège Bureau 326, 59 rue de Ponthieu, 75008 Paris.

## ⚠️ Point à trancher : le domaine

Le domaine est **codé en dur** à `https://serviotek-shop.vercel.app` dans sept
fichiers. Si le site tourne en réalité sur **serviotek.com**, ces URLs sont
fausses et il faut toutes les changer :

| Fichier | Ce que l'URL alimente |
| --- | --- |
| `app/sitemap.ts` | toutes les URLs du sitemap |
| `app/robots.ts` | l'adresse du sitemap |
| `app/layout.tsx` | `metadataBase` et le JSON-LD du site |
| `app/produit/[slug]/page.tsx` | l'URL de l'offre dans le JSON-LD produit |
| `app/api/checkout/route.ts` | les liens CGV et rétractation sur la facture |
| `lib/amazon.ts` | l'URL absolue des images envoyées à Amazon |

Conséquences si c'est faux : Google indexe le mauvais domaine, et Amazon ne
peut pas télécharger les photos des produits.

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
