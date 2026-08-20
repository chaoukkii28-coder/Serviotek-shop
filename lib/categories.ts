import type { Categorie } from "@/lib/products";

/**
 * Libellés et couleurs des rayons, partagés par le header, la page d'accueil
 * et la page catalogue. Volontairement séparé de lib/products.ts : le header
 * est un composant client, et importer le catalogue entier l'alourdirait.
 *
 * Deux jeux de couleurs par rayon : `couleurClair` pour un texte sur fond
 * blanc/clair (contraste AA), `couleurSombre` pour le même texte sur le
 * header/pied de page (`encre`). Les valeurs sont volontairement en dur
 * (hex / oklch) plutôt qu'en classes Tailwind : une classe construite
 * dynamiquement (`text-${couleur}`) n'est pas générée par Tailwind.
 */
export const CATEGORIES: {
  id: Categorie;
  label: string;
  couleur: string;
  couleurClair: string;
  couleurSombre: string;
}[] = [
  { id: "audio", label: "Audio & Écouteurs", couleur: "bg-sky-500", couleurClair: "#175b8f", couleurSombre: "oklch(0.80 0.11 245)" },
  { id: "maison", label: "Maison connectée", couleur: "bg-lime-500", couleurClair: "#0f6a46", couleurSombre: "oklch(0.82 0.13 160)" },
  { id: "bricolage", label: "Bricolage & Outils", couleur: "bg-amber-500", couleurClair: "#9c400c", couleurSombre: "oklch(0.80 0.13 62)" },
  { id: "detection", label: "Détection & Extérieur", couleur: "bg-rose-500", couleurClair: "#b02a22", couleurSombre: "oklch(0.78 0.13 25)" },
  { id: "bien-etre", label: "Bien-être & Style", couleur: "bg-violet-500", couleurClair: "#7a2fc4", couleurSombre: "oklch(0.80 0.13 300)" },
  { id: "accessoires", label: "Chargeurs & Accessoires", couleur: "bg-orange-500", couleurClair: "#7d5a06", couleurSombre: "oklch(0.84 0.13 92)" },
];

export const COULEUR_CLAIRE_CATEGORIE = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.couleurClair])
) as Record<Categorie, string>;

export const COULEUR_SOMBRE_CATEGORIE = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.couleurSombre])
) as Record<Categorie, string>;

export const NOMS_CATEGORIES = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<Categorie, string>;

export function lienCategorie(id: Categorie) {
  return `/produit?categorie=${id}`;
}
