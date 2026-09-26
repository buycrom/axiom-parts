import { lotDiscountTiers } from "@/lib/config";
import type { LotDiscountTier } from "@/types";

/** Retourne le palier de réduction applicable pour une quantité donnée. */
export function getLotDiscount(
  quantity: number,
  tiers: LotDiscountTier[] = lotDiscountTiers
): LotDiscountTier | null {
  const sorted = [...tiers].sort((a, b) => b.minQuantity - a.minQuantity);
  return sorted.find((t) => quantity >= t.minQuantity) ?? null;
}

export function calculateLotPricing(
  lines: { unitPrice: number; quantity: number }[],
  tiers: LotDiscountTier[] = lotDiscountTiers
) {
  const totalQty = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const tier = getLotDiscount(totalQty, tiers);
  const discountPercent = tier?.discountPercent ?? 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.round((subtotal - discountAmount) * 100) / 100;

  return {
    totalQty,
    subtotal: Math.round(subtotal * 100) / 100,
    discountPercent,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total,
    tier,
    nextTier: [...tiers]
      .sort((a, b) => a.minQuantity - b.minQuantity)
      .find((t) => t.minQuantity > totalQty),
  };
}
