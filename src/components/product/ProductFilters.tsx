"use client";

import { productTypes, categories, sportSubcategories } from "@/data/categories";
import { getCompatibilityOptions } from "@/data/products";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo } from "react";

export interface FilterState {
  category: string;
  sportSubcategory: string;
  type: string;
  brand: string;
  priceMax: number;
  inStockOnly: boolean;
  isNew: boolean;
  isPack: boolean;
  query: string;
  sort: SortOption;
}

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "popular";

export const defaultFilters: FilterState = {
  category: "",
  sportSubcategory: "",
  type: "",
  brand: "",
  priceMax: 100,
  inStockOnly: false,
  isNew: false,
  isPack: false,
  query: "",
  sort: "relevance",
};

export function ProductFilters({
  filters,
  onChange,
  onClose,
  className,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClose?: () => void;
  className?: string;
}) {
  const brands = useMemo(
    () => getCompatibilityOptions().map((o) => o.brand),
    []
  );

  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className={cn("space-y-8", className)}>
      <div className="flex items-center justify-between">
        <p className="instrument-label">Filtres</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-axiom-muted hover:text-axiom-text lg:hidden"
            aria-label="Fermer les filtres"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <FilterGroup label="Catégorie">
        <select
          value={filters.category}
          onChange={(e) =>
            onChange({
              ...filters,
              category: e.target.value,
              sportSubcategory:
                e.target.value === "sport" ? filters.sportSubcategory : "",
            })
          }
          className={selectClass}
        >
          <option value="">Toutes</option>
          {categories
            .filter((c) => c.id !== "sur-mesure")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          <option value="packs">Packs</option>
        </select>
      </FilterGroup>

      {filters.category === "sport" && (
        <FilterGroup label="Sport">
          <select
            value={filters.sportSubcategory}
            onChange={(e) => set("sportSubcategory", e.target.value)}
            className={selectClass}
          >
            <option value="">Tous les sports</option>
            {sportSubcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      <FilterGroup label="Type de produit">
        <select
          value={filters.type}
          onChange={(e) => set("type", e.target.value)}
          className={selectClass}
        >
          <option value="">Tous</option>
          {productTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Compatibilité (marque)">
        <select
          value={filters.brand}
          onChange={(e) => set("brand", e.target.value)}
          className={selectClass}
        >
          <option value="">Toutes</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label={`Prix max · ${filters.priceMax} €`}>
        <input
          type="range"
          min={5}
          max={100}
          step={1}
          value={filters.priceMax}
          onChange={(e) => set("priceMax", Number(e.target.value))}
          className="w-full accent-axiom-accent"
        />
      </FilterGroup>

      <FilterGroup label="Disponibilité & badges">
        <div className="space-y-2">
          <Check
            label="En stock uniquement"
            checked={filters.inStockOnly}
            onChange={(v) => set("inStockOnly", v)}
          />
          <Check
            label="Nouveautés"
            checked={filters.isNew}
            onChange={(v) => set("isNew", v)}
          />
          <Check
            label="Packs uniquement"
            checked={filters.isPack}
            onChange={(v) => set("isPack", v)}
          />
        </div>
      </FilterGroup>

      <button
        type="button"
        onClick={() => onChange({ ...defaultFilters, query: filters.query })}
        className="text-sm text-axiom-muted underline-offset-4 hover:text-axiom-accent hover:underline"
      >
        Réinitialiser les filtres
      </button>
    </aside>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-axiom-text">{label}</p>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-axiom-muted hover:text-axiom-text">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-axiom-accent"
      />
      {label}
    </label>
  );
}

const selectClass =
  "w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text focus:border-axiom-accent focus:outline-none";
