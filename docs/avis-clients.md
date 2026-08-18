# Recueillir des avis clients

Le bloc d'invitation est déjà en place sur la page de confirmation de commande.
Il reste **invisible tant que le lien n'est pas renseigné** dans `lib/avis.ts` —
un bouton qui ne mène nulle part vaut moins que pas de bouton du tout.

```ts
export const LIEN_AVIS = "";        // ← coller le lien ici
export const NOM_SERVICE_AVIS = "Google";
```

## Quel service choisir

Trois dispositifs existent chez Google, et ils ne servent pas la même chose.

### 1. Fiche d'établissement Google — probablement inaccessible ici

C'est le service qui affiche les étoiles à côté d'un commerce dans Google Maps.
**Il exige un contact en personne avec les clients** : une boutique physique, ou
une zone d'intervention où l'on se déplace.

Une activité 100 % en ligne n'y a pas droit, et une fiche créée malgré tout finit
suspendue. À écarter, sauf à recevoir réellement des clients à une adresse.

### 2. Google Customer Reviews — le dispositif fait pour l'e-commerce

Gratuit, et conçu exactement pour ce cas. Après un achat, Google envoie
lui-même un questionnaire au client, et la note obtenue devient une **note
vendeur** affichée dans Google Shopping et les annonces.

Il faut passer par **Google Merchant Center** (`merchants.google.com`) :

1. Créer un compte Merchant Center avec les informations de la SASU.
2. Valider la propriété du domaine du site.
3. Activer **Google Customer Reviews** dans les programmes.
4. Coller sur la page de confirmation le module fourni par Google.

Ce module remplacera le bloc actuel : Google gère la collecte, il n'y a rien à
stocker de notre côté.

### 3. Avis publiés sur le site — étoiles dans les résultats de recherche

Les avis affichés sur les fiches produits peuvent faire apparaître des étoiles
dans Google grâce aux données structurées (`AggregateRating`). C'est ce qui
augmente le plus le taux de clic.

Deux conditions, non négociables :

- il faut **stocker** les avis, donc une base de données (Vercel Postgres offre
  un palier gratuit qui suffit largement) ;
- les données structurées doivent refléter des **avis réels visibles sur la
  page**. Déclarer une note sans avis derrière est une violation des règles
  Google, sanctionnée par le retrait des extraits enrichis.

## Ce qui est interdit, et lourdement

En France, publier de faux avis ou en modifier le sens est une **pratique
commerciale trompeuse** (articles L121-2 et suivants du Code de la
consommation) : jusqu'à deux ans d'emprisonnement et 300 000 € d'amende, montant
pouvant être porté à 10 % du chiffre d'affaires.

Sont également interdits :

- rédiger soi-même des avis, ou les faire rédiger par des proches ;
- acheter des avis, quelle que soit la plateforme ;
- ne publier que les avis positifs et masquer les négatifs ;
- offrir une réduction **en échange d'un avis positif** (proposer une réduction
  pour un avis, quel qu'en soit le contenu, reste toléré si c'est annoncé).

La DGCCRF contrôle ce point régulièrement sur les boutiques en ligne.

## L'ordre conseillé

1. **Merchant Center + Google Customer Reviews** — gratuit, aucune base de
   données, et la collecte est faite par Google.
2. **Avis sur le site** une fois qu'il y a du volume de commandes, avec une base
   de données et les données structurées.

Le premier point suffit largement pour démarrer.
