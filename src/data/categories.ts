export const categories = [
  {
    id: "flight-sim",
    slug: "flight-sim",
    code: "CAT 01",
    title: "Flight Simulator",
    description:
      "Accessoires, protections, supports et pièces pour simulateur de vol.",
    href: "/flight-sim",
    icon: "🛩️",
  },
  {
    id: "car-sim",
    slug: "car-sim",
    code: "CAT 02",
    title: "Car Simulator",
    description:
      "Accessoires pour setups sim racing et équipements automobile.",
    href: "/car-sim",
    icon: "🏎️",
  },
  {
    id: "pieces-pratiques",
    slug: "pieces-pratiques",
    code: "CAT 03",
    title: "Pièces pratiques",
    description:
      "Supports, adaptateurs, organisation, petites pièces utiles.",
    href: "/pieces-pratiques",
    icon: "🔧",
  },
  {
    id: "sur-mesure",
    slug: "sur-mesure",
    code: "CAT 04",
    title: "Sur mesure",
    description:
      "Une pièce spécifique ? Nous pouvons étudier votre besoin.",
    href: "/sur-mesure",
    icon: "🛠️",
  },
] as const;

export const productTypes = [
  { id: "protection", label: "Protection" },
  { id: "support", label: "Support" },
  { id: "organisation", label: "Organisation" },
  { id: "adaptateur", label: "Adaptateur" },
  { id: "accessoire", label: "Accessoire" },
  { id: "pack", label: "Pack" },
] as const;

export const trustPoints = [
  "Fabrication soignée",
  "Compatibilité clairement indiquée",
  "Pièces conçues pour un usage réel",
  "Support client",
] as const;
