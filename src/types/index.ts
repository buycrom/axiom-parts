/** Types e-commerce AXIOM — structure prête pour backend */

export type ProductCategory =
  | "flight-sim"
  | "car-sim"
  | "pieces-pratiques"
  | "packs"
  | "sport"
  | "sur-mesure";

/** Sous-catégories Sport — étendre librement */
export type SportSubcategory =
  | "tennis"
  | "rugby"
  | "football"
  | "basketball"
  | "golf"
  | "cyclisme"
  | "course-a-pied"
  | "fitness";

export type ProductType =
  | "protection"
  | "support"
  | "organisation"
  | "adaptateur"
  | "accessoire"
  | "pack";

export type ProductBadge = "nouveau" | "populaire" | "pack";

export interface CompatibleEquipment {
  brand: string;
  model: string;
  version?: string;
}

export interface ProductImage {
  /** Chemin ou URL — remplacer par de vraies photos produit */
  src: string;
  alt: string;
  type: "alone" | "installed" | "situ" | "dimensions" | "detail";
}

export interface ProductSpecs {
  material?: string;
  dimensions?: string;
  weight?: string;
  fabrication?: string;
  color?: string;
  finish?: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceModifier?: number;
  inStock?: boolean;
}

export interface BundleItem {
  productId: string;
  quantity: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Description courte orientée problème / utilité */
  shortDescription: string;
  /** À quoi sert cette pièce */
  purpose: string;
  /** Comment l'utiliser */
  howToUse: string;
  category: ProductCategory;
  /** Requis si category === "sport" */
  sportSubcategory?: SportSubcategory;
  type: ProductType;
  price: number;
  compareAtPrice?: number;
  badge?: ProductBadge;
  images: ProductImage[];
  compatibleWith: CompatibleEquipment[];
  specs: ProductSpecs;
  variants?: ProductVariant[];
  colors?: { id: string; label: string; hex: string }[];
  installationSteps?: { title: string; description: string }[];
  relatedProductIds?: string[];
  frequentlyBoughtWith?: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isPack?: boolean;
  packItems?: BundleItem[];
  inStock: boolean;
  /** SEO */
  metaTitle?: string;
  metaDescription?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variantId?: string;
  colorId?: string;
  /** Lot personnalisé composé par le client */
  customLot?: {
    id: string;
    items: { productId: string; quantity: number; unitPrice: number; name: string }[];
    discountPercent: number;
    subtotal: number;
    total: number;
  };
}

export interface LotDiscountTier {
  /** Quantité minimale d'articles dans le lot */
  minQuantity: number;
  /** Réduction en % (ex. 5 = -5 %) */
  discountPercent: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  currency: string;
  locale: string;
  /** Seuil livraison offerte — undefined = désactivé (pas de fausse promo) */
  freeShippingThreshold?: number;
}
