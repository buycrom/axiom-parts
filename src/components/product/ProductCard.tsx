"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Plus } from "lucide-react";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-axiom-border bg-axiom-surface transition-all duration-300",
        "hover:border-axiom-muted/50 hover:bg-axiom-elevated",
        className
      )}
    >
      <Link href={`/produit/${product.slug}`} className="relative block">
        <div className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]?.src}
            alt={product.images[0]?.alt ?? product.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        {product.badge && (
          <div className="absolute left-3 top-3">
            <Badge type={product.badge} />
          </div>
        )}
        <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="instrument-label rounded bg-axiom-bg/80 px-2 py-1 backdrop-blur">
            VIEW
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/produit/${product.slug}`} className="flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-axiom-text transition-colors group-hover:text-white">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-axiom-muted">
            {product.shortDescription}
          </p>
        </Link>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="font-mono text-xs text-axiom-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem({ productId: product.id, quantity: 1 })}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-axiom-border bg-axiom-bg text-axiom-text transition-all hover:border-axiom-accent hover:bg-axiom-accent hover:text-white"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-axiom-border bg-axiom-surface">
      <ProductPlaceholder label="Chargement…" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-axiom-elevated" />
        <div className="h-3 w-full rounded bg-axiom-elevated" />
      </div>
    </div>
  );
}
