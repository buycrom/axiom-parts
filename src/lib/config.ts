import type { SiteConfig, LotDiscountTier } from "@/types";

/**
 * Configuration marque — à adapter selon les infos réelles.
 * Ne pas inventer d'avantages commerciaux non confirmés.
 */
export const siteConfig: SiteConfig = {
  name: "AXIOM",
  tagline: "Des pièces qui améliorent votre setup",
  description:
    "Pièces fonctionnelles, accessoires et protections conçus pour les passionnés de simulation et les setups exigeants.",
  email: "contact@axiom-parts.example",
  currency: "EUR",
  locale: "fr-FR",
  // Définir un seuil réel quand la règle commerciale est confirmée :
  // freeShippingThreshold: 60,
};

/**
 * Réductions lots personnalisés — modifier librement.
 * Le palier le plus élevé atteint s'applique (quantité totale d'articles dans le lot).
 */
export const lotDiscountTiers: LotDiscountTier[] = [
  { minQuantity: 3, discountPercent: 5 },
  { minQuantity: 5, discountPercent: 10 },
  { minQuantity: 8, discountPercent: 15 },
];

export const navLinks = [
  { href: "/flight-sim", label: "Flight Simulator", icon: "🛩️" },
  { href: "/car-sim", label: "Car Simulator", icon: "🏎️" },
  { href: "/packs", label: "Packs", icon: "📦" },
  { href: "/pieces-pratiques", label: "Pièces pratiques", icon: "🔧" },
  { href: "/boutique", label: "Boutique", icon: "🛍️" },
  { href: "/sur-mesure", label: "Sur mesure", icon: "🛠️" },
  { href: "/a-propos", label: "À propos", icon: "ℹ️" },
] as const;
