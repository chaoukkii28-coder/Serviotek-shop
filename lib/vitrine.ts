import { products, getProduct, type Categorie, type Product } from "@/lib/products";
import { SELECTION_LANCEMENT } from "@/lib/amazon";

/**
 * Données dérivées du catalogue pour l'accueil "boutique dense". Rien n'est
 * stocké en dur ici : tout se recalcule depuis lib/products.ts pour rester
 * juste si le catalogue change.
 */

/** Une image par produit du rayon, complétée par d'autres photos des mêmes
 * produits si le rayon a moins de `n` références. */
export function imagesRayon(categorie: Categorie, n = 4): string[] {
  const produitsRayon = products.filter((p) => p.categorie === categorie);
  const images: string[] = [];

  for (const p of produitsRayon) {
    images.push(p.images[0]);
  }
  if (images.length < n) {
    for (const p of produitsRayon) {
      images.push(...p.images.slice(1));
    }
  }
  return images.slice(0, n);
}

/** Produits à moins de 20 €, dans l'ordre du catalogue. */
export function produitsMoinsDe(seuil: number, n = 4): Product[] {
  return products.filter((p) => p.price < seuil).slice(0, n);
}

/**
 * Sélection manuelle des références à mettre en avant (pas un vrai
 * classement de ventes : aucune donnée d'analytics n'existe encore). On
 * privilégie les produits avec de vraies photos, plus présentables.
 */
export function produitsEnAvant(n = 6): Product[] {
  return SELECTION_LANCEMENT.map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p))
    .slice(0, n);
}

/** Produits avec une remise active, triés par pourcentage décroissant. */
export function produitsEnPromo(): (Product & { promo: NonNullable<Product["promo"]> })[] {
  return products
    .filter((p): p is Product & { promo: NonNullable<Product["promo"]> } => Boolean(p.promo))
    .sort((a, b) => b.promo.pct - a.promo.pct);
}

/** Décalage Europe/Paris (minutes, positif) par rapport à l'UTC pour un instant donné. */
function decalageParisMinutes(instant: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(instant)
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});

  const commeUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((commeUTC - instant) / 60000);
}

/**
 * Instant (timestamp ms) de minuit prochain à Paris, quel que soit le fuseau
 * du visiteur. Recalculée à chaque appel : appeler cette fonction en boucle
 * (ex. chaque seconde) suffit à repartir sur 24h une fois minuit passé, sans
 * état à réinitialiser à la main.
 */
export function finDesOffresDuJour(depuis: number = Date.now()): number {
  const decalage1 = decalageParisMinutes(depuis);
  const parisWall = depuis + decalage1 * 60000;
  const veille = new Date(parisWall);
  const minuitWallUTC = Date.UTC(
    veille.getUTCFullYear(),
    veille.getUTCMonth(),
    veille.getUTCDate() + 1,
    0,
    0,
    0
  );
  // Recalcule le décalage pour la date cible : gère le changement d'heure DST.
  const decalage2 = decalageParisMinutes(minuitWallUTC - decalage1 * 60000);
  return minuitWallUTC - decalage2 * 60000;
}

export function prixRemise(prix: number, pct: number): number {
  return Math.round(prix * (1 - pct / 100) * 100) / 100;
}

export function formaterPrix(valeur: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(valeur);
}

/** Découpe un prix numérique en euros/centimes, pour un affichage façon Amazon. */
export function decomposerPrix(valeur: number): { euros: number; centimes: string } {
  const euros = Math.floor(valeur + 1e-9);
  const centimes = Math.round((valeur - euros) * 100);
  return { euros, centimes: String(centimes).padStart(2, "0") };
}
