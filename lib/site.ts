/**
 * Adresse publique du site, source unique pour le sitemap, robots.txt, les
 * données structurées, les liens de la facture Stripe et les URLs absolues
 * envoyées à Amazon.
 *
 * Se règle par la variable d'environnement NEXT_PUBLIC_SITE_URL côté
 * hébergeur. Sans elle, c'est le domaine ci-dessous qui s'applique — il ne
 * doit exister qu'à cet endroit : le coder en dur ailleurs a déjà conduit à
 * ce que sitemap et JSON-LD désignent un autre domaine que le site réel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://serviotek.com"
).replace(/\/$/, "");

/** Construit une URL absolue à partir d'un chemin interne. */
export function urlAbsolue(chemin: string): string {
  return `${SITE_URL}/${chemin.replace(/^\//, "")}`;
}
