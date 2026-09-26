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
  { href: "/boutique", label: "Boutique" },
  { href: "/flight-sim", label: "Flight Simulator" },
  { href: "/car-sim", label: "Car Simulator" },
  {
    href: "/sport",
    label: "Sport",
    children: [
      { href: "/sport", label: "Tous les sports" },
      { href: "/sport/tennis", label: "Tennis" },
      { href: "/sport/rugby", label: "Rugby" },
      { href: "/sport/football", label: "Football" },
      { href: "/sport/basketball", label: "Basketball" },
      { href: "/sport/golf", label: "Golf" },
      { href: "/sport/cyclisme", label: "Cyclisme" },
      { href: "/sport/course-a-pied", label: "Course à pied" },
      { href: "/sport/fitness", label: "Fitness" },
    ],
  },
  { href: "/packs", label: "Packs" },
  { href: "/pieces-pratiques", label: "Pièces pratiques" },
  { href: "/sur-mesure", label: "Sur mesure" },
  { href: "/a-propos", label: "À propos" },
] as const;
