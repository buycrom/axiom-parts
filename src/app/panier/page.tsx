"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { CartItemRow } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { products } from "@/data/products";

export default function PanierPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const openCart = useCartStore((s) => s.openCart);

  const threshold = siteConfig.freeShippingThreshold;
  const remaining =
    threshold && subtotal < threshold ? threshold - subtotal : null;

  const suggestions = products
    .filter((p) => !items.some((i) => i.productId === p.id) && !p.isPack)
    .slice(0, 3);

  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <p className="instrument-label mb-2">CART</p>
      <h1 className="font-display text-3xl font-semibold md:text-4xl">
        Panier
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 border border-dashed border-axiom-border px-6 py-16 text-center">
          <p className="text-axiom-muted">Votre panier est vide.</p>
          <Link href="/boutique" className="mt-6 inline-block">
            <Button>Découvrir la boutique</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.variantId}-${item.colorId}`}
                {...item}
              />
            ))}

            {suggestions.length > 0 && (
              <div className="mt-10">
                <p className="instrument-label mb-3">Complétez votre setup</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produit/${p.slug}`}
                      className="border border-axiom-border p-3 transition-colors hover:border-axiom-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]?.src}
                        alt=""
                        className="aspect-square w-full object-cover"
                      />
                      <p className="mt-2 line-clamp-2 text-sm font-medium">
                        {p.name}
                      </p>
                      <p className="font-mono text-xs text-axiom-accent">
                        {formatPrice(p.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit border border-axiom-border bg-axiom-surface p-5 lg:sticky lg:top-24">
            {remaining !== null && (
              <p className="mb-4 rounded-md bg-axiom-accent-dim px-3 py-2 font-mono text-xs text-axiom-accent">
                Il vous manque {formatPrice(remaining)} pour la livraison
                offerte.
              </p>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-axiom-muted">Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-muted">Livraison</span>
                <span className="font-mono text-xs">Au checkout</span>
              </div>
              <div className="flex justify-between border-t border-axiom-border pt-3 font-display text-lg font-semibold">
                <span>Total</span>
                <span className="text-axiom-accent">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-5 block">
              <Button className="w-full">Passer commande</Button>
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="mt-3 w-full text-center text-sm text-axiom-muted hover:text-axiom-text"
            >
              Ouvrir le tiroir panier
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
