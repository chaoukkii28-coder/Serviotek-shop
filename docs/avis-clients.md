# Avis clients

Le site recueille et affiche ses propres avis, avec des étoiles. Rien ne passe
par un service extérieur.

## Comment ça marche

1. Après un paiement, la page de confirmation propose de noter les produits
   achetés — étoiles cliquables, prénom, commentaire libre.
2. L'avis part vers `/api/avis`, qui **vérifie la commande auprès de Stripe** :
   la session doit être payée, et contenir ce produit précis. Un visiteur qui
   n'a rien acheté ne peut pas déposer d'avis.
3. L'avis est stocké, puis affiché sur la fiche produit avec la mention
   « Achat vérifié ».
4. La note moyenne apparaît sous le titre du produit, et alimente les données
   structurées `AggregateRating` — ce qui fait apparaître les étoiles dans les
   résultats Google.

Une contrainte d'unicité (produit, session Stripe) empêche de noter deux fois
le même article avec la même commande.

## ⚠️ Étape à faire : activer la base de données

Tant qu'aucune base n'est connectée, le site fonctionne normalement mais
**aucun avis n'est proposé ni affiché**. L'API répond « Les avis ne sont pas
encore activés ».

Dans le tableau de bord Vercel :

1. Ouvrir le projet, onglet **Storage**
2. **Create Database** → choisir **Neon** (Postgres) — l'offre gratuite suffit
   très largement pour des avis
3. La rattacher au projet : Vercel pose alors `DATABASE_URL` tout seul
4. Redéployer

La table se crée d'elle-même au premier avis. Aucune migration à lancer.

## Ce que la loi interdit

Publier de faux avis ou en modifier le sens est une **pratique commerciale
trompeuse** (articles L121-2 et suivants du Code de la consommation) : jusqu'à
deux ans d'emprisonnement et 300 000 € d'amende, montant pouvant être porté à
10 % du chiffre d'affaires.

Sont également interdits :

- rédiger soi-même des avis, ou les faire rédiger par des proches ;
- acheter des avis, quelle que soit la plateforme ;
- ne publier que les avis positifs et masquer les négatifs ;
- offrir une réduction **en échange d'un avis positif** (proposer une réduction
  pour un avis, quel qu'en soit le contenu, reste toléré si c'est annoncé).

La vérification d'achat protège de la première catégorie : personne ne peut
déposer d'avis sans avoir payé. Pour le reste, la règle est simple — **ne
jamais supprimer un avis négatif honnête**. Y répondre publiquement inspire
plus confiance que son absence.

Côté Google : la note déclarée dans les données structurées doit correspondre à
des avis **réellement visibles sur la page**. C'est le cas ici, la note n'est
émise que lorsque des avis existent.
