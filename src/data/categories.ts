import type { SportSubcategory } from "@/types";

export const sportSubcategories: {
  id: SportSubcategory;
  label: string;
  description: string;
}[] = [
  {
    id: "tennis",
    label: "Tennis",
    description: "Supports, protections et accessoires pour le tennis.",
  },
  {
    id: "rugby",
    label: "Rugby",
    description: "Pièces et accessoires utiles pour le rugby.",
  },
  {
    id: "football",
    label: "Football",
    description: "Accessoires et petites pièces pour le football.",
  },
  {
    id: "basketball",
    label: "Basketball",
    description: "Supports et accessoires pour le basketball.",
  },
  {
    id: "golf",
    label: "Golf",
    description: "Organisation et accessoires pour le golf.",
  },
  {
    id: "cyclisme",
    label: "Cyclisme",
    description: "Supports, adaptateurs et protections vélo.",
  },
  {
    id: "course-a-pied",
    label: "Course à pied",
    description: "Accessoires pratiques pour la course à pied.",
  },
  {
    id: "fitness",
    label: "Fitness",
    description: "Organisation et supports pour le fitness.",
  },
];

export const categories = [
  {
    id: "flight-sim",
    slug: "flight-sim",
    code: "CAT 01",
    title: "Flight Simulator",
    description:
      "Accessoires, protections, supports et pièces pour simulateur de vol.",
    href: "/flight-sim",
  },
  {
    id: "car-sim",
    slug: "car-sim",
    code: "CAT 02",
    title: "Car Simulator",
    description:
      "Accessoires pour setups sim racing et équipements automobile.",
    href: "/car-sim",
  },
  {
    id: "sport",
    slug: "sport",
    code: "CAT 03",
    title: "Sport",
    description:
      "Pièces et accessoires pour tennis, rugby, football et d'autres sports.",
    href: "/sport",
  },
  {
    id: "pieces-pratiques",
    slug: "pieces-pratiques",
    code: "CAT 04",
    title: "Pièces pratiques",
    description:
      "Supports, adaptateurs, organisation, petites pièces utiles.",
    href: "/pieces-pratiques",
  },
  {
    id: "sur-mesure",
    slug: "sur-mesure",
    code: "CAT 05",
    title: "Sur mesure",
    description:
      "Une pièce spécifique ? Nous pouvons étudier votre besoin.",
    href: "/sur-mesure",
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

export function getSportSubcategory(id: string) {
  return sportSubcategories.find((s) => s.id === id);
}
