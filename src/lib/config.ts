import type { SiteConfig } from "@/types";

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

export const navLinks = [
  { href: "/boutique", label: "Boutique" },
  { href: "/flight-sim", label: "Flight Sim" },
  { href: "/simulation", label: "Simulation" },
  { href: "/pieces-pratiques", label: "Pièces pratiques" },
  { href: "/packs", label: "Packs" },
  { href: "/sur-mesure", label: "Sur mesure" },
  { href: "/a-propos", label: "À propos" },
] as const;
