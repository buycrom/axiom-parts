"use client";

import Link from "next/link";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { getProductById } from "@/data/products";
import type { Product } from "@/types";

export function BundleCard({
  pack,
  className,
}: {
  pack: Product;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const items =
    pack.packItems
      ?.map((pi) => ({ product: getProductById(pi.productId), qty: pi.quantity }))
      .filter((x): x is { product: Product; qty: number } => Boolean(x.product)) ??
    [];

  const separateTotal =
    pack.compareAtPrice ??
    items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const savings = separateTotal - pack.price;

  return (
    <article
      className={cn(
        "flex flex-col border border-axiom-border bg-axiom-surface transition-colors hover:border-axiom-muted/50",
        className
      )}
    >
      <Link href={`/produit/${pack.slug}`} className="block">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pack.images[0]?.src}
            alt={pack.images[0]?.alt ?? pack.name}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="absolute left-3 top-3">
            <span className="rounded bg-axiom-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
              Pack
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="instrument-label mb-2">BUNDLE</p>
        <Link href={`/produit/${pack.slug}`}>
          <h3 className="font-display text-xl font-semibold">{pack.name}</h3>
        </Link>
        <p className="mt-2 text-sm text-axiom-muted">{pack.shortDescription}</p>

        {items.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-axiom-border pt-4">
            {items.map(({ product, qty }) => (
              <li
                key={product.id}
                className="flex justify-between gap-2 font-mono text-xs text-axiom-muted"
              >
                <span>
                  {qty > 1 ? `${qty}× ` : ""}
                  {product.name}
                </span>
                <span>{formatPrice(product.price * qty)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto space-y-3 pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-axiom-muted line-through">
                Produits séparés : {formatPrice(separateTotal)}
              </p>
              <p className="font-display text-2xl font-semibold text-axiom-accent">
                {formatPrice(pack.price)}
              </p>
              {savings > 0 && (
                <p className="font-mono text-xs text-axiom-success">
                  Économie : {formatPrice(savings)}
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => addItem({ productId: pack.id, quantity: 1 })}
          >
            Ajouter le pack
          </Button>
        </div>
      </div>
    </article>
  );
}

export function BundleCardEmpty() {
  return (
    <div className="border border-axiom-border">
      <ProductPlaceholder label="Pack" aspect="wide" />
    </div>
  );
}
