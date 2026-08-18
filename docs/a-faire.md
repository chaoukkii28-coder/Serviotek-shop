# À faire — pas à pas

Trois choses ne peuvent être faites que par toi, parce qu'elles passent par
**tes comptes personnels** : personne d'autre ne peut s'y connecter à ta place.
Elles sont classées de la plus rapide à la plus longue.

---

## 1. Encaisser de l'argent sur ta boutique — 20 minutes

Aujourd'hui, si quelqu'un veut acheter sur ton site, **le paiement échoue**. Il
manque une clé. Voilà comment la mettre.

### a) Récupérer la clé chez Stripe

1. Va sur **dashboard.stripe.com** et connecte-toi (ou crée le compte).
2. En haut à droite, vérifie que tu es en **mode Test** pour commencer.
3. Dans le menu de gauche : **Développeurs** → **Clés API**.
4. Copie la ligne **« Clé secrète »**. Elle commence par `sk_test_`.

> ⚠️ Cette clé, c'est comme le code de ta carte bancaire. Ne la colle nulle
> part d'autre que dans l'étape suivante. Ne l'envoie à personne, moi compris.

### b) Coller la clé chez Vercel

1. Va sur **vercel.com**, connecte-toi, ouvre le projet **serviotek-shop**.
2. Onglet **Settings** → **Environment Variables**.
3. Crée une variable :
   - Name : `STRIPE_SECRET_KEY`
   - Value : colle la clé copiée à l'étape a)
4. Crée une deuxième variable :
   - Name : `NEXT_PUBLIC_SITE_URL`
   - Value : l'adresse de ton site, par exemple `https://serviotek-shop.vercel.app`
5. Clique **Save**.
6. Onglet **Deployments** → sur le déploiement le plus récent, menu `…` →
   **Redeploy**. Sans cette étape, la clé n'est pas prise en compte.

### c) Tester

Va sur ton site, ajoute un produit au panier, va jusqu'au paiement. En mode
test, utilise le numéro de carte `4242 4242 4242 4242`, une date future et
n'importe quel code à 3 chiffres. Si tu arrives sur la page de confirmation,
**ça marche**.

Ensuite seulement, repasse Stripe en **mode Live**, récupère la clé qui commence
par `sk_live_` et refais l'étape b) avec.

---

## 2. Les photos des produits — c'est le plus important

Les sept produits réellement sourcés ont de vraies photos, désormais recadrées
au format Amazon (1600 px, fond blanc) dans `public/images-amazon`. Les six
articles de rentrée d'origine, eux, tournent encore sur des visuels
d'illustration : sur la boutique c'est gênant, sur Amazon ça fait suspendre le
compte.

Ce qu'il te faut, pour chaque produit que tu veux vraiment vendre :

- une photo du **produit exact** que le client recevra ;
- **fond blanc uni** pour la photo principale ;
- **1000 pixels minimum** de côté ;
- ni texte, ni logo, ni filigrane sur l'image.

Deux façons de les obtenir :

- **Ton fournisseur** te les fournit — demande-lui les « images HD produit »,
  c'est une demande courante et gratuite.
- **Tu les prends toi-même** : le produit sur une feuille blanche, près d'une
  fenêtre, en journée. Un téléphone récent suffit largement.

Quand tu les as, envoie-les-moi (ce sont juste des fichiers, rien de
confidentiel) et je les intègre au site.

---

## 3. Amazon — état réel du compte

Compte vendeur unique **« Xonto »**, avec plusieurs pays rattachés (un seul
compte, plusieurs places de marché : aucun risque de suspension pour comptes
multiples).

| Région | État |
| --- | --- |
| **Europe** — dont **Amazon.fr**, de, es, it, nl, be, pl, se, ie, co.uk | inscription **passée** |
| États-Unis, Canada, Mexique | actifs |
| Australie | actif, mais **aucun mode de versement** (bloquant sur cette région) |
| Égypte, Japon | en attente d'inscription |

Amazon.fr est la seule place de marché qui compte ici : catalogue en français,
prix en euros, SASU française, livraison France / Belgique / Suisse /
Luxembourg.

### Ce qui reste à régler sur le compte

1. **Vérifier la carte de crédit** — Amazon demande une validation auprès de la
   banque pour l'ensemble des sites européens, avec une empreinte temporaire de
   1 € qui n'est pas débitée. Bouton « Vérifier » dans *Modes de règlement*.
2. **Mode de versement (compte bancaire)** — obligatoire pour encaisser. Il
   manquait côté Australie ; à contrôler côté Europe.
3. **Adresse de retour** — signalée à mettre à jour côté États-Unis.

## 4. Les codes EAN pour Amazon — compte plusieurs semaines

Amazon exige un code-barres unique par produit. Tu as deux voies.

### Voie A — Demander une exemption (gratuit, à essayer en premier)

1. Connecte-toi à **Seller Central**, place de marché **France**.
2. Menu **Catalogue** → **Demander une exemption GTIN**.
3. Choisis la catégorie du produit et la marque **Serviotek**.
4. Amazon te demandera des **photos du produit avec ta marque visible** dessus
   ou sur l'emballage. C'est le point qui bloque le plus souvent.

### Voie B — Acheter les codes chez GS1 (payant, mais définitif)

1. Va sur **gs1fr.org**.
2. Adhésion : compter environ **150 € la première année** pour un lot couvrant
   100 codes, puis une cotisation annuelle.

> ⚠️ **N'achète jamais de codes EAN d'occasion** sur eBay, Leboncoin ou des
> sites de revente. Amazon vérifie auprès de GS1 que le code correspond bien à
> ton entreprise, et bloque les comptes qui utilisent des codes recyclés.

Quand tu as les codes, donne-les-moi avec le nom du produit correspondant, et je
remplis le fichier.

---

## Ce que je peux faire, moi

Tout le reste : le code, les fiches produits, les textes, les pages légales, le
fichier Amazon, les corrections. Dis-moi ce qui ne va pas, je m'en occupe.

## Ce que je ne peux pas faire

Me connecter à tes comptes — Stripe, Vercel, Amazon, GS1, ta banque. Ce n'est
pas une question de volonté : je n'ai aucun accès à ces services, et il ne faut
**jamais** me confier tes mots de passe ni tes clés, même si tu me fais
confiance. Une conversation n'est pas un coffre-fort.

---

## Avant d'ouvrir les ventes — le point à ne pas oublier

Avant d'activer le paiement en mode Live, assure-toi d'avoir une source
d'approvisionnement pour chaque produit affiché. Sinon, une commande arrive et
tu ne peux pas la livrer — ce qui coûte un remboursement, un avis négatif, et
sur Amazon, le compte.

Le plus prudent : ne garder en ligne que les produits que tu peux réellement
expédier, et masquer les autres en attendant.
