"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-16 md:mt-24">
      <p className="instrument-label mb-3">RELATED</p>
      <h2 className="font-display mb-8 text-2xl font-semibold md:text-3xl">
        Vous pourriez aussi aimer
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function FrequentlyBoughtWith({
  main,
  products,
}: {
  main: Product;
  products: Product[];
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [selected, setSelected] = useState<string[]>(
    products.map((p) => p.id)
  );

  if (products.length === 0) return null;

  const all = [main, ...products.filter((p) => selected.includes(p.id))];
  const total = all.reduce((s, p) => s + p.price, 0);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function addAll() {
    addItem({ productId: main.id, quantity: 1 });
    selected.forEach((id) => addItem({ productId: id, quantity: 1 }));
  }

  return (
    <section className="mt-16 border border-axiom-border bg-axiom-surface p-6 md:mt-20 md:p-8">
      <p className="instrument-label mb-3">FREQUENTLY BOUGHT WITH</p>
      <h2 className="font-display text-2xl font-semibold">Souvent acheté avec</h2>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <ProductMini product={main} locked />
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="font-mono text-axiom-muted">+</span>
              <ProductMini
                product={p}
                checked={selected.includes(p.id)}
                onToggle={() => toggle(p.id)}
              />
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-axiom-border pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-mono text-xs text-axiom-muted">Total sélection</p>
          <p className="font-display text-2xl font-semibold text-axiom-accent">
            {formatPrice(total)}
          </p>
          <Button className="mt-3 w-full" onClick={addAll}>
            Tout ajouter
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductMini({
  product,
  locked,
  checked,
  onToggle,
}: {
  product: Product;
  locked?: boolean;
  checked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={`flex w-[140px] flex-col border p-2 sm:w-[160px] ${
        locked || checked
          ? "border-axiom-accent/50 bg-axiom-elevated"
          : "border-axiom-border opacity-60"
      }`}
    >
      <Link href={`/produit/${product.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]?.src}
          alt=""
          className="aspect-square w-full object-cover"
        />
        <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug">
          {product.name}
        </p>
        <p className="mt-1 font-mono text-xs text-axiom-accent">
          {formatPrice(product.price)}
        </p>
      </Link>
      {!locked && (
        <label className="mt-2 flex cursor-pointer items-center gap-1.5 font-mono text-[10px] text-axiom-muted">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="accent-axiom-accent"
          />
          Inclure
        </label>
      )}
    </div>
  );
}
