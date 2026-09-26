"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { lotDiscountTiers } from "@/lib/config";
import { calculateLotPricing } from "@/lib/lot-pricing";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check, Minus, Plus } from "lucide-react";

type Selection = Record<string, number>;

export function LotBuilder() {
  const [selection, setSelection] = useState<Selection>({});
  const addCustomLot = useCartStore((s) => s.addCustomLot);

  const selectable = useMemo(
    () => products.filter((p) => p.inStock),
    []
  );

  const lines = useMemo(
    () =>
      Object.entries(selection)
        .filter(([, qty]) => qty > 0)
        .map(([productId, quantity]) => {
          const product = products.find((p) => p.id === productId)!;
          return {
            productId,
            quantity,
            unitPrice: product.price,
            name: product.name,
            product,
          };
        }),
    [selection]
  );

  const pricing = calculateLotPricing(lines);

  function setQty(productId: string, qty: number) {
    setSelection((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }

  function toggle(productId: string) {
    setSelection((prev) => {
      if (prev[productId]) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: 1 };
    });
  }

  function handleAdd() {
    if (lines.length === 0) return;
    addCustomLot({
      items: lines.map((l) => ({
        productId: l.productId,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        name: l.name,
      })),
      discountPercent: pricing.discountPercent,
      subtotal: pricing.subtotal,
      total: pricing.total,
    });
    setSelection({});
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          {lotDiscountTiers
            .slice()
            .sort((a, b) => a.minQuantity - b.minQuantity)
            .map((tier) => (
              <span
                key={tier.minQuantity}
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-xs",
                  pricing.discountPercent === tier.discountPercent
                    ? "border-axiom-accent bg-axiom-accent-dim text-axiom-accent"
                    : "border-axiom-border text-axiom-muted"
                )}
              >
                {tier.minQuantity}+ pièces → −{tier.discountPercent}%
              </span>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {selectable.map((product) => {
            const qty = selection[product.id] ?? 0;
            const selected = qty > 0;
            return (
              <div
                key={product.id}
                className={cn(
                  "flex flex-col border transition-colors",
                  selected
                    ? "border-axiom-accent bg-axiom-accent-dim/40"
                    : "border-axiom-border bg-axiom-surface hover:border-axiom-muted"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(product.id)}
                  className="relative text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt ?? product.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  {selected && (
                    <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-axiom-accent text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {product.isPack && (
                    <span className="absolute left-2 top-2 rounded bg-axiom-accent px-1.5 py-0.5 font-mono text-[9px] uppercase text-white">
                      Pack
                    </span>
                  )}
                </button>
                <div className="flex flex-1 flex-col p-3">
                  <button
                    type="button"
                    onClick={() => toggle(product.id)}
                    className="text-left"
                  >
                    <p className="font-display text-sm font-semibold leading-snug">
                      {product.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-axiom-muted">
                      {product.shortDescription}
                    </p>
                  </button>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-sm text-axiom-accent">
                      {formatPrice(product.price)}
                    </span>
                    {selected ? (
                      <div className="inline-flex items-center border border-axiom-border bg-axiom-bg">
                        <button
                          type="button"
                          className="p-1.5 text-axiom-muted hover:text-axiom-text"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.75rem] text-center font-mono text-sm">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="p-1.5 text-axiom-muted hover:text-axiom-text"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQty(product.id, 1)}
                        className="font-mono text-[10px] uppercase tracking-wider text-axiom-muted hover:text-axiom-accent"
                      >
                        + Ajouter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="h-fit border border-axiom-border bg-axiom-surface p-5 lg:sticky lg:top-24">
        <p className="instrument-label mb-2">LOT · BUILDER</p>
        <h3 className="font-display text-xl font-semibold">Votre lot</h3>

        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-axiom-muted">
            Sélectionnez des produits pour composer votre lot.
          </p>
        ) : (
          <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto border-b border-axiom-border pb-4">
            {lines.map((l) => (
              <li
                key={l.productId}
                className="flex justify-between gap-2 text-sm"
              >
                <span className="text-axiom-muted">
                  {l.quantity}× {l.name}
                </span>
                <span className="shrink-0 font-mono text-xs">
                  {formatPrice(l.unitPrice * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-axiom-muted">Articles</span>
            <span className="font-mono">{pricing.totalQty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-axiom-muted">Prix normal</span>
            <span
              className={
                pricing.discountPercent > 0 ? "line-through text-axiom-muted" : ""
              }
            >
              {formatPrice(pricing.subtotal)}
            </span>
          </div>
          {pricing.discountPercent > 0 && (
            <div className="flex justify-between text-axiom-success">
              <span>Réduction (−{pricing.discountPercent}%)</span>
              <span>−{formatPrice(pricing.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-axiom-border pt-3 font-display text-lg font-semibold">
            <span>Prix final</span>
            <span className="text-axiom-accent">{formatPrice(pricing.total)}</span>
          </div>
        </div>

        {pricing.nextTier && (
          <p className="mt-3 rounded-md bg-axiom-elevated px-3 py-2 font-mono text-[10px] text-axiom-muted">
            +{pricing.nextTier.minQuantity - pricing.totalQty} article
            {pricing.nextTier.minQuantity - pricing.totalQty > 1 ? "s" : ""} pour
            atteindre −{pricing.nextTier.discountPercent}%
          </p>
        )}

        <Button
          className="mt-5 w-full"
          disabled={lines.length === 0}
          onClick={handleAdd}
        >
          Ajouter le lot au panier
        </Button>
        <p className="mt-2 text-center font-mono text-[10px] text-axiom-muted">
          Paliers modifiables dans src/lib/config.ts
        </p>
      </aside>
    </div>
  );
}
