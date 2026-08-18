import type { MetadataRoute } from "next";

const SITE_URL = "https://serviotek-shop.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages propres à une session : rien à indexer, et le panier ferait
      // remonter des URLs vides dans les résultats de recherche.
      disallow: ["/panier", "/commande-confirmee", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
