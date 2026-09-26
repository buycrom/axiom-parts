/**
 * ═══════════════════════════════════════════════════════════════
 * DONNÉES DE DÉMONSTRATION — À REMPLACER
 * ═══════════════════════════════════════════════════════════════
 * Ces produits sont fictifs et servent uniquement à démontrer
 * le fonctionnement du site. Remplacez-les par vos vrais produits,
 * prix, compatibilités et caractéristiques.
 * Les compatibilités listées ne sont PAS des informations réelles.
 * ═══════════════════════════════════════════════════════════════
 */

import type { Product } from "@/types";

export const DEMO_DATA_NOTICE =
  "Données de démonstration — à remplacer par les informations produit réelles.";

/** Placeholder SVG data-URI — remplacer par de vraies photos */
export function productPlaceholder(
  label: string,
  accent = "%23FF6B2C"
): string {
  const encoded = encodeURIComponent(label);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Crect fill='%231A1D21' width='800' height='800'/%3E%3Crect x='40' y='40' width='720' height='720' fill='none' stroke='%232A2F36' stroke-width='1'/%3E%3Cline x1='40' y1='120' x2='760' y2='120' stroke='%232A2F36' stroke-width='1'/%3E%3Ctext x='60' y='90' fill='%236B7280' font-family='monospace' font-size='14'%3ESYSTEM / PRODUCT%3C/text%3E%3Ctext x='400' y='400' text-anchor='middle' fill='${accent}' font-family='system-ui' font-size='22' font-weight='600'%3E${encoded}%3C/text%3E%3Ctext x='400' y='440' text-anchor='middle' fill='%234B5563' font-family='monospace' font-size='12'%3EIMAGE PLACEHOLDER%3C/text%3E%3C/svg%3E`;
}

export const products: Product[] = [
  {
    id: "demo-01",
    slug: "cache-protection-equipement",
    name: "Cache de protection pour votre équipement",
    shortDescription:
      "Protège votre matériel lorsqu'il n'est pas utilisé.",
    purpose:
      "Cette pièce protège les surfaces sensibles de votre équipement contre la poussière, les chocs légers et l'usure liée au stockage. Conçue pour s'intégrer discrètement à votre setup.",
    howToUse:
      "Positionnez le cache sur l'équipement concerné. Aucun outil requis. Retirez-le avant utilisation.",
    category: "flight-sim",
    type: "protection",
    price: 14.9,
    badge: "populaire",
    isPopular: true,
    images: [
      {
        src: productPlaceholder("Cache protection"),
        alt: "Cache de protection — vue produit [DÉMO]",
        type: "alone",
      },
      {
        src: productPlaceholder("Installé"),
        alt: "Cache installé sur équipement [DÉMO]",
        type: "installed",
      },
      {
        src: productPlaceholder("En situation"),
        alt: "Cache en situation réelle [DÉMO]",
        type: "situ",
      },
      {
        src: productPlaceholder("Dimensions"),
        alt: "Schéma dimensions [DÉMO]",
        type: "dimensions",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle A", version: "v1" },
      { brand: "Démo Brand", model: "Modèle B" },
    ],
    specs: {
      material: "À définir",
      dimensions: "À mesurer (données démo)",
      weight: "—",
      fabrication: "Fabrication sur demande",
      color: "Noir / Gris",
    },
    colors: [
      { id: "noir", label: "Noir", hex: "#1A1D21" },
      { id: "gris", label: "Gris", hex: "#6B7280" },
    ],
    installationSteps: [
      {
        title: "Préparer la surface",
        description: "Assurez-vous que l'équipement est éteint et propre.",
      },
      {
        title: "Positionner le cache",
        description: "Alignez le cache avec les points de référence.",
      },
      {
        title: "Vérifier le maintien",
        description: "Contrôlez que la pièce est bien en place.",
      },
    ],
    relatedProductIds: ["demo-02", "demo-03"],
    frequentlyBoughtWith: ["demo-02", "demo-03"],
    inStock: true,
    metaTitle: "Cache de protection équipement | AXIOM",
    metaDescription:
      "Protège votre matériel lorsqu'il n'est pas utilisé. Compatibilité indiquée clairement.",
  },
  {
    id: "demo-02",
    slug: "support-equipement-stable",
    name: "Support stable pour équipement",
    shortDescription:
      "Maintient votre matériel en position fixe, sans glisser.",
    purpose:
      "Offre un ancrage stable à votre équipement sur bureau ou cockpit. Réduit les micro-mouvements et libère de l'espace de travail.",
    howToUse:
      "Fixez le support à la surface prévue, puis installez votre équipement selon le guide fourni.",
    category: "car-sim",
    type: "support",
    price: 22.9,
    badge: "nouveau",
    isNew: true,
    images: [
      {
        src: productPlaceholder("Support"),
        alt: "Support équipement — vue produit [DÉMO]",
        type: "alone",
      },
      {
        src: productPlaceholder("Installé"),
        alt: "Support installé [DÉMO]",
        type: "installed",
      },
      {
        src: productPlaceholder("Détail"),
        alt: "Détail du support [DÉMO]",
        type: "detail",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle A", version: "v1" },
      { brand: "Setup Co", model: "Station X" },
    ],
    specs: {
      material: "À définir",
      dimensions: "À mesurer (données démo)",
      fabrication: "Fabrication sur demande",
      color: "Noir",
    },
    relatedProductIds: ["demo-01", "demo-03"],
    frequentlyBoughtWith: ["demo-01", "demo-03"],
    inStock: true,
    metaTitle: "Support équipement stable | AXIOM",
    metaDescription:
      "Maintient votre matériel en position fixe. Conçu pour les setups de simulation.",
  },
  {
    id: "demo-03",
    slug: "organiseur-cables",
    name: "Organiseur de câbles pour setup",
    shortDescription:
      "Range et guide vos câbles pour un setup plus clair.",
    purpose:
      "Sépare et canalise les câbles autour de votre poste. Facilite l'accès aux connecteurs et réduit l'encombrement visuel.",
    howToUse:
      "Fixez l'organiseur le long du parcours des câbles, puis passez chaque câble dans le canal prévu.",
    category: "pieces-pratiques",
    type: "organisation",
    price: 9.9,
    badge: "populaire",
    isPopular: true,
    images: [
      {
        src: productPlaceholder("Organiseur"),
        alt: "Organiseur de câbles [DÉMO]",
        type: "alone",
      },
      {
        src: productPlaceholder("En situation"),
        alt: "Organiseur installé [DÉMO]",
        type: "situ",
      },
    ],
    compatibleWith: [
      { brand: "Universel", model: "Bureau / Cockpit" },
    ],
    specs: {
      material: "À définir",
      dimensions: "À mesurer (données démo)",
      fabrication: "Fabrication sur demande",
      color: "Noir",
    },
    relatedProductIds: ["demo-02", "demo-04"],
    frequentlyBoughtWith: ["demo-01", "demo-02"],
    inStock: true,
    metaTitle: "Organiseur de câbles setup | AXIOM",
    metaDescription:
      "Range et guide vos câbles pour un setup plus clair et accessible.",
  },
  {
    id: "demo-04",
    slug: "adaptateur-montage",
    name: "Adaptateur de montage",
    shortDescription:
      "Relie deux éléments incompatibles sans bricolage.",
    purpose:
      "Assure une interface mécanique entre deux pièces de votre setup qui ne s'assemblent pas nativement.",
    howToUse:
      "Intercalez l'adaptateur entre les deux éléments, serrez selon les points de fixation indiqués.",
    category: "pieces-pratiques",
    type: "adaptateur",
    price: 12.5,
    images: [
      {
        src: productPlaceholder("Adaptateur"),
        alt: "Adaptateur de montage [DÉMO]",
        type: "alone",
      },
      {
        src: productPlaceholder("Détail"),
        alt: "Détail adaptateur [DÉMO]",
        type: "detail",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle B" },
      { brand: "Setup Co", model: "Station X" },
    ],
    specs: {
      material: "À définir",
      dimensions: "À mesurer (données démo)",
      fabrication: "Fabrication sur demande",
    },
    relatedProductIds: ["demo-02", "demo-05"],
    inStock: true,
    metaTitle: "Adaptateur de montage | AXIOM",
    metaDescription:
      "Relie deux éléments incompatibles de votre setup sans bricolage.",
  },
  {
    id: "demo-05",
    slug: "support-cockpit",
    name: "Support cockpit pour accessoires",
    shortDescription:
      "Fixe vos accessoires à portée de main dans le cockpit.",
    purpose:
      "Optimise l'ergonomie de votre poste de simulation en plaçant les accessoires exactement où vous en avez besoin.",
    howToUse:
      "Montez le support sur le profil ou la surface indiquée, puis fixez l'accessoire.",
    category: "flight-sim",
    type: "support",
    price: 18.9,
    isNew: true,
    badge: "nouveau",
    images: [
      {
        src: productPlaceholder("Support cockpit"),
        alt: "Support cockpit [DÉMO]",
        type: "alone",
      },
      {
        src: productPlaceholder("Installé"),
        alt: "Support cockpit installé [DÉMO]",
        type: "installed",
      },
      {
        src: productPlaceholder("En situation"),
        alt: "Support en situation cockpit [DÉMO]",
        type: "situ",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle A", version: "v1" },
      { brand: "Cockpit Lab", model: "Frame Pro" },
    ],
    specs: {
      material: "À définir",
      dimensions: "À mesurer (données démo)",
      fabrication: "Fabrication sur demande",
      color: "Noir",
    },
    relatedProductIds: ["demo-01", "demo-06"],
    frequentlyBoughtWith: ["demo-01", "demo-03"],
    inStock: true,
    metaTitle: "Support cockpit accessoires | AXIOM",
    metaDescription:
      "Fixe vos accessoires à portée de main dans votre cockpit de simulation.",
  },
  {
    id: "demo-06",
    slug: "pack-cockpit-propre",
    name: "Pack Cockpit Propre",
    shortDescription:
      "Cache, support et organisation des câbles — tout pour un setup net.",
    purpose:
      "Réunit les pièces essentielles pour protéger, stabiliser et organiser votre poste. Économie par rapport à l'achat séparé.",
    howToUse:
      "Installez d'abord le support, puis l'organiseur de câbles, enfin le cache de protection.",
    category: "packs",
    type: "pack",
    price: 41.9,
    compareAtPrice: 47.7,
    badge: "pack",
    isPack: true,
    isPopular: true,
    packItems: [
      { productId: "demo-01", quantity: 1 },
      { productId: "demo-02", quantity: 1 },
      { productId: "demo-03", quantity: 1 },
    ],
    images: [
      {
        src: productPlaceholder("Pack Cockpit"),
        alt: "Pack Cockpit Propre [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle A", version: "v1" },
    ],
    specs: {
      fabrication: "Ensemble de pièces fabriquées sur demande",
    },
    relatedProductIds: ["demo-05"],
    inStock: true,
    metaTitle: "Pack Cockpit Propre | AXIOM",
    metaDescription:
      "Cache + support + organisation des câbles. Équipez votre setup en un clic.",
  },
  {
    id: "demo-07",
    slug: "pack-protection",
    name: "Pack Protection",
    shortDescription:
      "Plusieurs protections complémentaires pour votre matériel.",
    purpose:
      "Protège plusieurs points sensibles de votre équipement avec un ensemble cohérent de caches.",
    howToUse:
      "Identifiez chaque zone à protéger et posez la pièce correspondante.",
    category: "packs",
    type: "pack",
    price: 26.9,
    compareAtPrice: 29.8,
    badge: "pack",
    isPack: true,
    packItems: [
      { productId: "demo-01", quantity: 2 },
    ],
    images: [
      {
        src: productPlaceholder("Pack Protection"),
        alt: "Pack Protection [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [
      { brand: "Démo Brand", model: "Modèle A", version: "v1" },
      { brand: "Démo Brand", model: "Modèle B" },
    ],
    specs: {
      fabrication: "Ensemble de pièces fabriquées sur demande",
    },
    inStock: true,
    metaTitle: "Pack Protection | AXIOM",
    metaDescription:
      "Ensemble de protections complémentaires pour votre matériel de simulation.",
  },
  {
    id: "demo-08",
    slug: "pack-organisation",
    name: "Pack Organisation",
    shortDescription:
      "Supports, passe-câbles et organiseurs pour un setup ordonné.",
    purpose:
      "Structure le câblage et le positionnement des accessoires autour de votre poste.",
    howToUse:
      "Commencez par les supports, puis placez les organiseurs le long des parcours de câbles.",
    category: "packs",
    type: "pack",
    price: 31.9,
    compareAtPrice: 35.3,
    badge: "pack",
    isPack: true,
    packItems: [
      { productId: "demo-02", quantity: 1 },
      { productId: "demo-03", quantity: 1 },
      { productId: "demo-04", quantity: 1 },
    ],
    images: [
      {
        src: productPlaceholder("Pack Orga"),
        alt: "Pack Organisation [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [
      { brand: "Universel", model: "Bureau / Cockpit" },
    ],
    specs: {
      fabrication: "Ensemble de pièces fabriquées sur demande",
    },
    inStock: true,
    metaTitle: "Pack Organisation | AXIOM",
    metaDescription:
      "Supports + passe-câbles + organiseurs pour un setup ordonné.",
  },
  {
    id: "demo-09",
    slug: "support-raquette-tennis",
    name: "Support mural pour raquette de tennis",
    shortDescription:
      "Range votre raquette de façon stable et accessible.",
    purpose:
      "Libère l'espace au sol et maintient la raquette en sécurité entre les sessions.",
    howToUse:
      "Fixez le support au mur, puis posez la raquette dans le logement prévu.",
    category: "sport",
    sportSubcategory: "tennis",
    type: "support",
    price: 16.9,
    badge: "nouveau",
    isNew: true,
    images: [
      {
        src: productPlaceholder("Support tennis"),
        alt: "Support raquette tennis [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [{ brand: "Universel", model: "Raquette tennis" }],
    specs: {
      material: "À définir",
      fabrication: "Fabrication sur demande",
      color: "Noir",
    },
    inStock: true,
    metaTitle: "Support raquette tennis | AXIOM",
    metaDescription:
      "Range votre raquette de tennis de façon stable et accessible.",
  },
  {
    id: "demo-10",
    slug: "organiseur-equipement-rugby",
    name: "Organiseur d'équipement rugby",
    shortDescription:
      "Regroupe protège-dents, scratchs et petits accessoires.",
    purpose:
      "Évite de chercher vos accessoires avant l'entraînement ou le match.",
    howToUse:
      "Placez chaque accessoire dans le compartiment prévu, rangez dans le sac.",
    category: "sport",
    sportSubcategory: "rugby",
    type: "organisation",
    price: 12.9,
    badge: "populaire",
    isPopular: true,
    images: [
      {
        src: productPlaceholder("Orga rugby"),
        alt: "Organiseur rugby [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [{ brand: "Universel", model: "Équipement rugby" }],
    specs: {
      material: "À définir",
      fabrication: "Fabrication sur demande",
    },
    inStock: true,
    metaTitle: "Organiseur équipement rugby | AXIOM",
    metaDescription:
      "Regroupe vos petits accessoires rugby pour un accès rapide.",
  },
  {
    id: "demo-11",
    slug: "support-ballon-football",
    name: "Support de rangement pour ballon",
    shortDescription:
      "Maintient le ballon en place sans l'écraser.",
    purpose:
      "Isole le ballon du sol et facilite le rangement dans un local ou un garage.",
    howToUse: "Posez le support, placez le ballon dans le berceau.",
    category: "sport",
    sportSubcategory: "football",
    type: "support",
    price: 14.5,
    images: [
      {
        src: productPlaceholder("Support ballon"),
        alt: "Support ballon football [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [{ brand: "Universel", model: "Ballon taille 5" }],
    specs: {
      material: "À définir",
      fabrication: "Fabrication sur demande",
    },
    inStock: true,
    metaTitle: "Support ballon football | AXIOM",
    metaDescription: "Maintient le ballon en place sans l'écraser.",
  },
  {
    id: "demo-12",
    slug: "passe-cable-velo",
    name: "Guide-câble pour vélo",
    shortDescription:
      "Maintient les gaines et câbles le long du cadre.",
    purpose:
      "Réduit le frottement et l'usure des câbles sur les points de contact du cadre.",
    howToUse:
      "Clipsez le guide sur le cadre aux points indiqués, passez le câble.",
    category: "sport",
    sportSubcategory: "cyclisme",
    type: "organisation",
    price: 8.9,
    isNew: true,
    badge: "nouveau",
    images: [
      {
        src: productPlaceholder("Guide vélo"),
        alt: "Guide-câble vélo [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [{ brand: "Universel", model: "Cadre vélo" }],
    specs: {
      material: "À définir",
      fabrication: "Fabrication sur demande",
    },
    inStock: true,
    metaTitle: "Guide-câble vélo | AXIOM",
    metaDescription:
      "Maintient les gaines et câbles le long du cadre de vélo.",
  },
  {
    id: "demo-13",
    slug: "support-halteres-fitness",
    name: "Support de rangement haltères",
    shortDescription:
      "Stabilise vos haltères et libère l'espace au sol.",
    purpose:
      "Organise les haltères dans un espace dédié pour un accès rapide à l'entraînement.",
    howToUse: "Positionnez le support, placez les haltères dans les logements.",
    category: "sport",
    sportSubcategory: "fitness",
    type: "support",
    price: 24.9,
    images: [
      {
        src: productPlaceholder("Support haltères"),
        alt: "Support haltères [DÉMO]",
        type: "alone",
      },
    ],
    compatibleWith: [{ brand: "Universel", model: "Haltères" }],
    specs: {
      material: "À définir",
      fabrication: "Fabrication sur demande",
    },
    inStock: true,
    metaTitle: "Support haltères fitness | AXIOM",
    metaDescription:
      "Stabilise vos haltères et libère l'espace au sol.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getPopularProducts(limit = 4): Product[] {
  return products.filter((p) => p.isPopular).slice(0, limit);
}

export function getPackProducts(): Product[] {
  return products.filter((p) => p.isPack);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedProductIds) return [];
  return product.relatedProductIds
    .map(getProductById)
    .filter((p): p is Product => Boolean(p));
}

export function getFrequentlyBoughtWith(product: Product): Product[] {
  if (!product.frequentlyBoughtWith) return [];
  return product.frequentlyBoughtWith
    .map(getProductById)
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.type.includes(q) ||
      p.category.includes(q) ||
      p.compatibleWith.some(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q)
      )
  );
}

export function filterByCompatibility(
  brand: string,
  model: string,
  version?: string
): Product[] {
  return products.filter((p) =>
    p.compatibleWith.some((c) => {
      const brandMatch = c.brand === brand;
      const modelMatch = c.model === model;
      if (!brandMatch || !modelMatch) return false;
      if (version && c.version) return c.version === version;
      return true;
    })
  );
}

/** Marques / modèles uniques pour le configurateur */
export function getCompatibilityOptions() {
  const brands = new Map<string, Map<string, Set<string>>>();

  for (const product of products) {
    for (const c of product.compatibleWith) {
      if (!brands.has(c.brand)) brands.set(c.brand, new Map());
      const models = brands.get(c.brand)!;
      if (!models.has(c.model)) models.set(c.model, new Set());
      if (c.version) models.get(c.model)!.add(c.version);
    }
  }

  return Array.from(brands.entries()).map(([brand, models]) => ({
    brand,
    models: Array.from(models.entries()).map(([model, versions]) => ({
      model,
      versions: Array.from(versions),
    })),
  }));
}
