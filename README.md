# Serviotek — Boutique sur-mesure

Prototype fonctionnel : catalogue, panier, paiement Stripe.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplis STRIPE_SECRET_KEY
npm run dev
```

Ouvre http://localhost:3000

## Avant la mise en ligne

1. **Créer un compte Stripe** sur https://dashboard.stripe.com, récupérer la clé secrète
   (mode test d'abord, puis mode live) et la mettre dans `.env.local` / dans les
   variables d'environnement de l'hébergeur.
2. **Remplacer les produits d'exemple** dans `lib/products.ts` par tes vrais produits
   (nom, prix, photos, specs, délai fournisseur).
3. **Compléter les mentions légales et CGV** (`app/mentions-legales`, `app/cgv`) avec
   les infos de ton Kbis (SIREN, capital social, siège social, dirigeant) — idéalement
   relues par un professionnel.
4. **Déployer** sur Vercel (le plus simple pour Next.js) :
   ```bash
   npx vercel
   ```
   Puis connecter ton nom de domaine dans les réglages du projet Vercel.
5. **Rediriger les anciennes URLs Shopify** vers les nouvelles pages une fois le site
   en ligne, pour ne pas perdre ton référencement.

## Structure du projet

- `app/page.tsx` — page d'accueil / catalogue
- `app/produit/[slug]/page.tsx` — fiche produit
- `app/panier/page.tsx` — panier + déclenchement du paiement
- `app/api/checkout/route.ts` — création de la session de paiement Stripe
- `lib/products.ts` — catalogue produits (à remplacer par une vraie base de données
  plus tard si besoin)
- `components/CartContext.tsx` — état du panier (stocké en local dans le navigateur)
