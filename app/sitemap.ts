import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const SITE_URL = "https://serviotek-shop.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const produits: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produit/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
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
  ];
}
