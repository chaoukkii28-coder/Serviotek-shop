import type { Categorie } from "@/lib/products";

/**
 * Libellés et couleurs des rayons, partagés par le header, la page d'accueil
 * et la page catalogue. Volontairement séparé de lib/products.ts : le header
 * est un composant client, et importer le catalogue entier l'alourdirait.
 */
export const CATEGORIES: { id: Categorie; label: string; couleur: string }[] = [
  { id: "scolaire", label: "Rentrée scolaire", couleur: "bg-red-600" },
  { id: "audio", label: "Audio & Écouteurs", couleur: "bg-sky-500" },
  { id: "maison", label: "Maison connectée", couleur: "bg-lime-500" },
  { id: "bricolage", label: "Bricolage & Outils", couleur: "bg-amber-500" },
  { id: "detection", label: "Détection & Extérieur", couleur: "bg-rose-500" },
  { id: "bien-etre", label: "Bien-être & Style", couleur: "bg-violet-500" },
  { id: "accessoires", label: "Chargeurs & Accessoires", couleur: "bg-orange-500" },
];

export const NOMS_CATEGORIES = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
) as Record<Categorie, string>;

export function lienCategorie(id: Categorie) {
  return `/produit?categorie=${id}`;
}
