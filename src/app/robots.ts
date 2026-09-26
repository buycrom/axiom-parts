import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/panier", "/api/"],
    },
    sitemap: "https://axiom-parts.example/sitemap.xml",
  };
}
