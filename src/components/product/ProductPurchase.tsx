"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import { trustPoints } from "@/data/categories";

export function ProductPurchase({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [colorId, setColorId] = useState(product.colors?.[0]?.id);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);

  let price = product.price;
  const variant = product.variants?.find((v) => v.id === variantId);
  if (variant?.priceModifier) price += variant.priceModifier;

  return (
    <div className="space-y-6">
      <div>
        <p className="instrument-label mb-2">
          PRODUCT · {product.id.toUpperCase()}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-axiom-muted">
          {product.shortDescription}
        </p>
      </div>

      <div>
        <p className="font-display text-3xl font-semibold text-axiom-accent">
          {formatPrice(price)}
        </p>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <p className="mt-1 font-mono text-sm text-axiom-muted">
            Séparé :{" "}
            <span className="line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          </p>
        )}
        <p className="mt-1 font-mono text-xs text-axiom-muted">
          {product.inStock ? "Disponible" : "Sur commande"}
        </p>
      </div>

      {product.colors && product.colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">Couleur</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColorId(c.id)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                  colorId === c.id
                    ? "border-axiom-accent bg-axiom-accent-dim"
                    : "border-axiom-border hover:border-axiom-muted"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: c.hex }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">Variante</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  variantId === v.id
                    ? "border-axiom-accent bg-axiom-accent-dim"
                    : "border-axiom-border"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium">Quantité</p>
        <div className="inline-flex items-center border border-axiom-border">
          <button
            type="button"
            className="p-3 text-axiom-muted hover:text-axiom-text"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center font-mono">{qty}</span>
          <button
            type="button"
            className="p-3 text-axiom-muted hover:text-axiom-text"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Augmenter"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full sm:w-auto sm:min-w-[240px]"
        onClick={() =>
          addItem({
            productId: product.id,
            quantity: qty,
            colorId,
            variantId,
          })
        }
      >
        Ajouter au panier
      </Button>

      <ul className="space-y-2 border-t border-axiom-border pt-6">
        {trustPoints.map((t) => (
          <li key={t} className="flex items-center gap-2 text-sm text-axiom-muted">
            <span className="text-axiom-accent">✓</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
