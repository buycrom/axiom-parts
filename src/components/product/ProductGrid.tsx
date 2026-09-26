import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-axiom-border px-6 py-16 text-center">
        <p className="instrument-label mb-2">STATUS · EMPTY</p>
        <p className="text-axiom-muted">Aucun produit ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
