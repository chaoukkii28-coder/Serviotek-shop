# Publier le catalogue sur Amazon Seller Central

## Générer le fichier

Lancer le site (`npm run dev`), puis :

| URL | Ce que ça donne |
| --- | --- |
| `/api/amazon-feed?stock=25` | Flat file **TSV** — le format qu'Amazon avale |
| `/api/amazon-feed?format=csv&stock=25` | Le même en **CSV**, ouvrable dans Excel |
| `/api/amazon-feed?rapport=1` | **Ce qu'il manque**, produit par produit (JSON) |
| `/api/amazon-feed?categorie=audio&stock=25` | Restriction à un rayon |
| `/api/amazon-feed?lancement=1&stock=25` | **Les 7 références par lesquelles démarrer** |

## Par où commencer : 7 références, pas 20

Ouvrir toutes les offres d'un coup multiplie le coût des EAN, des photos et du
risque de suspension, avant d'avoir vendu quoi que ce soit. La liste
`SELECTION_LANCEMENT` (`lib/amazon.ts`) retient les **sept références
réellement sourcées** : ce sont les seules à disposer de vraies photos produit
(quatre à huit chacune), recadrées au format exigé par Amazon.

Validez un cycle complet sur ces sept — mise en ligne, première vente, un
retour client — avant d'élargir.

`stock=25` fixe la quantité pour tous les produits sans stock défini. Sans ce
paramètre le stock vaut 0 et **les offres ne sont pas visibles à l'achat**.

## Les 4 blocages à lever avant de pouvoir publier

Le rapport les sort pour chaque produit. Il reste aujourd'hui **deux blocages**
sur les sept références de lancement : le code EAN et le `feed_product_type`.
La marque, le fabricant et le pays d'origine sont désormais remplis par défaut.

### 1. Les codes EAN (le vrai goulot d'étranglement)

Amazon exige un GTIN par référence. Deux voies :

- **Acheter les codes chez GS1 France** (`gs1fr.org`) — c'est la voie propre.
  Compter environ 150 € d'adhésion la première année pour un préfixe couvrant
  100 codes, puis une cotisation annuelle.
- **Demander une exemption GTIN** dans Seller Central (Catalogue › Demander une
  exemption GTIN). Gratuit, accordé notamment aux produits sans code fabricant,
  mais il faut fournir des photos du produit avec votre marque dessus.

N'achetez **jamais** de codes EAN d'occasion sur des places de marché : Amazon
recoupe avec la base GS1 et bloque les comptes.

### 2. La marque

`brand_name` est obligatoire. Si vous vendez sous « Serviotek », il faut la
déposer (INPI, ~250 € pour 1 classe) puis l'enregistrer dans **Amazon Brand
Registry** — c'est aussi ce qui protège vos fiches contre le détournement.

### 3. Le type de produit et le rayon

`feed_product_type` et `recommended_browse_nodes` dépendent du modèle de
catégorie. Les modèles conseillés par catégorie du site sont dans
`MODELE_CONSEILLE` (`lib/amazon.ts`) — à confirmer dans Seller Central, Amazon
renomme régulièrement ses modèles.

### 4. Le pays d'origine

Obligatoire. Pour du sourcing CJdropshipping, c'est en général « Chine ».

## Les photos

Les sept références de lancement ont de vraies photos, recadrées au format
Amazon dans `public/images-amazon` : bandes noires retirées, sujet centré sur
un carré blanc de 1600 px. Le reste du catalogue tourne encore sur des visuels
d'illustration ou des images hébergées chez le fournisseur. Amazon impose :

- la photo du **produit réellement vendu**, pas une image d'ambiance ;
- image principale sur **fond blanc pur**, produit occupant ≥ 85 % du cadre ;
- **1000 px minimum** sur le plus grand côté (pour le zoom) ;
- aucun texte, logo, filigrane ni accessoire non vendu.

Une offre publiée avec des photos d'illustration passe l'upload, puis se fait
suspendre — d'où la règle : ne mettre en ligne que ce qui a de vraies photos.

## Remplir les données manquantes

Chaque produit accepte un bloc `amazon` (type `AmazonData` dans
`lib/products.ts`) :

```ts
{
  slug: "montre-connectee-hosgubo",
  // …
  amazon: {
    ean: "3086121001234",
    brand: "Serviotek",
    manufacturer: "Serviotek",
    productType: "WATCH",
    countryOfOrigin: "Chine",
    quantity: 50,
  },
}
```

Le code EAN est vérifié par sa clé de contrôle : une coquille ressort dans le
rapport au lieu d'être rejetée par Amazon après coup.

## Charger dans Seller Central

Place de marché à sélectionner : **Amazon.fr**. Le compte « Xonto » couvre
aussi l'Allemagne, l'Espagne, l'Italie, les Pays-Bas, la Belgique, la Pologne,
la Suède, l'Irlande et le Royaume-Uni — mais un catalogue rédigé en français
avec des prix en euros n'a de sens que sur Amazon.fr.

1. Seller Central › **Catalogue › Ajouter des produits en masse**.
2. Télécharger le **modèle de votre catégorie** (les colonnes exactes varient
   d'une catégorie à l'autre — c'est pour ça qu'on ne peut pas envoyer notre
   fichier tel quel).
3. Ouvrir le TSV généré, recopier chaque colonne dans la colonne de même nom du
   modèle. Les noms utilisés ici sont ceux d'Amazon, la correspondance est
   directe.
4. Onglet **Charger vos fichiers d'inventaire**, envoyer, puis lire le rapport
   de traitement : il indique la ligne et le motif de chaque rejet.

## Points à ne pas oublier

- **Compte Vendeur Pro** : 39 € HT/mois, obligatoire au-delà de 40 ventes/mois
  et pour charger des fichiers en masse.
- **Commissions** : 8 à 15 % du prix TTC selon la catégorie, à intégrer aux
  marges — les prix actuels du catalogue n'en tiennent pas compte.
- **Délais** : le site annonce 5 jours ouvrés maximum, ce qui passe en
  expédition vendeur (FBM). Ce délai n'est tenable en dropshipping que si le
  fournisseur expédie depuis un entrepôt européen — Amazon sanctionne les
  retards de livraison, et le taux d'expédition en retard doit rester sous 4 %.
- **Retours** : 30 jours minimum, à la charge du vendeur en cas de défaut.
