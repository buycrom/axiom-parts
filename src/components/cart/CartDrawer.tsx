"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { CartItemRow } from "./CartItem";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { X } from "lucide-react";
import { useEffect } from "react";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const threshold = siteConfig.freeShippingThreshold;
  const remaining =
    threshold && subtotal < threshold ? threshold - subtotal : null;

  const suggestions = products
    .filter(
      (p) =>
        !items.some((i) => i.productId === p.id) &&
        !p.isPack &&
        p.isPopular
    )
    .slice(0, 2);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col border-l border-axiom-border bg-axiom-bg shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-axiom-border px-5 py-4">
          <div>
            <p className="instrument-label">CART</p>
            <h2 className="font-display text-lg font-semibold">Votre panier</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded p-2 text-axiom-muted hover:bg-axiom-elevated hover:text-axiom-text"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="instrument-label mb-2">EMPTY</p>
              <p className="text-axiom-muted">Votre panier est vide.</p>
              <Link href="/boutique" onClick={closeCart}>
                <Button variant="outline" className="mt-6">
                  Découvrir la boutique
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.variantId}-${item.colorId}`}
                {...item}
              />
            ))
          )}

          {items.length > 0 && suggestions.length > 0 && (
            <div className="border-t border-axiom-border py-6">
              <p className="instrument-label mb-3">Complétez votre setup</p>
              <div className="space-y-3">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produit/${p.slug}`}
                    onClick={closeCart}
                    className="flex gap-3 rounded-md border border-axiom-border p-2 transition-colors hover:border-axiom-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]?.src}
                      alt=""
                      className="h-14 w-14 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="font-mono text-xs text-axiom-accent">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-axiom-border p-5">
            {remaining !== null && (
              <p className="rounded-md bg-axiom-accent-dim px-3 py-2 font-mono text-xs text-axiom-accent">
                Il vous manque {formatPrice(remaining)} pour la livraison
                offerte.
              </p>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-axiom-muted">Sous-total</span>
              <span className="font-display font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="font-mono text-[10px] text-axiom-muted">
              Livraison calculée au checkout
            </p>
            <Link href="/panier" onClick={closeCart} className="block">
              <Button variant="secondary" className="w-full">
                Voir le panier
              </Button>
            </Link>
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button className="w-full">Passer commande</Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
