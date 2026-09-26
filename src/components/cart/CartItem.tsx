"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItemRow({
  productId,
  quantity,
  variantId,
  colorId,
  customLot,
}: {
  productId: string;
  quantity: number;
  variantId?: string;
  colorId?: string;
  customLot?: {
    id: string;
    items: { productId: string; quantity: number; unitPrice: number; name: string }[];
    discountPercent: number;
    subtotal: number;
    total: number;
  };
}) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (customLot) {
    return (
      <div className="border-b border-axiom-border py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="instrument-label mb-1">LOT PERSONNALISÉ</p>
            <p className="font-display text-sm font-semibold">
              Lot composé ({customLot.items.reduce((s, i) => s + i.quantity, 0)}{" "}
              articles)
            </p>
            {customLot.discountPercent > 0 && (
              <p className="mt-1 font-mono text-xs text-axiom-success">
                −{customLot.discountPercent}% appliqué
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(productId)}
            className="shrink-0 p-1 text-axiom-muted hover:text-axiom-accent"
            aria-label="Retirer du panier"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <ul className="mt-2 space-y-1">
          {customLot.items.map((item) => (
            <li
              key={item.productId}
              className="font-mono text-[10px] text-axiom-muted"
            >
              {item.quantity}× {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center border border-axiom-border">
            <button
              type="button"
              className="p-1.5 text-axiom-muted hover:text-axiom-text"
              onClick={() => updateQuantity(productId, quantity - 1)}
              aria-label="Diminuer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2rem] text-center font-mono text-sm">
              {quantity}
            </span>
            <button
              type="button"
              className="p-1.5 text-axiom-muted hover:text-axiom-text"
              onClick={() => updateQuantity(productId, quantity + 1)}
              aria-label="Augmenter"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-right">
            {customLot.discountPercent > 0 && (
              <p className="font-mono text-[10px] text-axiom-muted line-through">
                {formatPrice(customLot.subtotal * quantity)}
              </p>
            )}
            <p className="font-display text-sm font-semibold">
              {formatPrice(customLot.total * quantity)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const product = getProductById(productId);
  if (!product) return null;

  let unitPrice = product.price;
  if (variantId && product.variants) {
    const v = product.variants.find((x) => x.id === variantId);
    if (v?.priceModifier) unitPrice += v.priceModifier;
  }

  return (
    <div className="flex gap-3 border-b border-axiom-border py-4">
      <Link
        href={`/produit/${product.slug}`}
        className="h-20 w-20 shrink-0 overflow-hidden border border-axiom-border bg-axiom-elevated"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]?.src}
          alt={product.images[0]?.alt ?? product.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/produit/${product.slug}`}
            className="font-display text-sm font-semibold leading-snug hover:text-axiom-accent"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(productId, variantId, colorId)}
            className="shrink-0 p-1 text-axiom-muted hover:text-axiom-accent"
            aria-label="Retirer du panier"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 font-mono text-xs text-axiom-muted">
          {formatPrice(unitPrice)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="inline-flex items-center border border-axiom-border">
            <button
              type="button"
              className="p-1.5 text-axiom-muted hover:text-axiom-text"
              onClick={() =>
                updateQuantity(productId, quantity - 1, variantId, colorId)
              }
              aria-label="Diminuer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2rem] text-center font-mono text-sm">
              {quantity}
            </span>
            <button
              type="button"
              className="p-1.5 text-axiom-muted hover:text-axiom-text"
              onClick={() =>
                updateQuantity(productId, quantity + 1, variantId, colorId)
              }
              aria-label="Augmenter"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-display text-sm font-semibold">
            {formatPrice(unitPrice * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
