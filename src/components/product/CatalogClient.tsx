"use client";

import { useMemo, useState } from "react";
import { products as allProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  ProductFilters,
  defaultFilters,
  type FilterState,
  type SortOption,
} from "@/components/product/ProductFilters";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CatalogClient({
  initialCategory,
  initialQuery,
  initialSportSubcategory,
}: {
  initialCategory?: string;
  initialQuery?: string;
  initialSportSubcategory?: string;
}) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory ?? "",
    sportSubcategory: initialSportSubcategory ?? "",
    query: initialQuery ?? "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.sportSubcategory?.includes(q) ||
          p.compatibleWith.some(
            (c) =>
              c.brand.toLowerCase().includes(q) ||
              c.model.toLowerCase().includes(q)
          )
      );
    }

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }
    if (filters.sportSubcategory) {
      list = list.filter(
        (p) => p.sportSubcategory === filters.sportSubcategory
      );
    }
    if (filters.type) {
      list = list.filter((p) => p.type === filters.type);
    }
    if (filters.brand) {
      list = list.filter((p) =>
        p.compatibleWith.some((c) => c.brand === filters.brand)
      );
    }
    list = list.filter((p) => p.price <= filters.priceMax);
    if (filters.inStockOnly) list = list.filter((p) => p.inStock);
    if (filters.isNew) list = list.filter((p) => p.isNew);
    if (filters.isPack) list = list.filter((p) => p.isPack);

    list = sortProducts(list, filters.sort);
    return list;
  }, [filters]);

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <ProductFilters filters={filters} onChange={setFilters} />
      </div>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </Button>
            <input
              type="search"
              value={filters.query}
              onChange={(e) =>
                setFilters((f) => ({ ...f, query: e.target.value }))
              }
              placeholder="Recherche instantanée…"
              className="h-10 w-full max-w-md rounded-md border border-axiom-border bg-axiom-bg px-3 text-sm focus:border-axiom-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs text-axiom-muted whitespace-nowrap">
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            </p>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  sort: e.target.value as SortOption,
                }))
              }
              className="h-10 rounded-md border border-axiom-border bg-axiom-bg px-3 text-sm focus:border-axiom-accent focus:outline-none"
              aria-label="Trier"
            >
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="newest">Nouveautés</option>
              <option value="popular">Populaires</option>
            </select>
          </div>
        </div>

        <ProductGrid products={filtered} />
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-[65] w-[min(100%,20rem)] overflow-y-auto border-r border-axiom-border bg-axiom-bg p-5 lg:hidden">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}

function sortProducts(
  list: typeof allProducts,
  sort: SortOption
): typeof allProducts {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "popular":
      return copy.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
    default:
      return copy;
  }
}
