import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

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
