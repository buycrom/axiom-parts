import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://axiom-parts.example";
  const staticRoutes = [
    "",
    "/boutique",
    "/flight-sim",
    "/car-sim",
    "/sport",
    "/pieces-pratiques",
    "/packs",
    "/composer-lot",
    "/sur-mesure",
    "/a-propos",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sportRoutes = [
    "tennis",
    "rugby",
    "football",
    "basketball",
    "golf",
    "cyclisme",
    "course-a-pied",
    "fitness",
  ].map((sub) => ({
    url: `${base}/sport/${sub}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/produit/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...sportRoutes, ...productRoutes];
}
