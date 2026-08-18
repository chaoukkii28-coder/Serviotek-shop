import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

/** Pages fixes : informatives, elles bougent peu mais doivent être indexées. */
const PAGES_FIXES = [
  "/livraison",
  "/retours",
  "/retractation",
  "/cgv",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const produits: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produit/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const fixes: MetadataRoute.Sitemap = PAGES_FIXES.map((chemin) => ({
    url: `${SITE_URL}${chemin}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/produit`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...produits,
    ...fixes,
  ];
}
