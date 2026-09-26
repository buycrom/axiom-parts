"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  filterByCompatibility,
  getCompatibilityOptions,
} from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ProductConfigurator() {
  const options = useMemo(() => getCompatibilityOptions(), []);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [searched, setSearched] = useState(false);

  const models = options.find((o) => o.brand === brand)?.models ?? [];
  const versions = models.find((m) => m.model === model)?.versions ?? [];

  const results = useMemo(() => {
    if (!searched || !brand || !model) return [];
    return filterByCompatibility(brand, model, version || undefined);
  }, [searched, brand, model, version]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (brand && model) setSearched(true);
  }

  function resetModel() {
    setModel("");
    setVersion("");
    setSearched(false);
  }

  return (
    <div className="border border-axiom-border bg-axiom-surface">
      <div className="border-b border-axiom-border px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="instrument-label">COMPATIBILITY · FINDER</p>
          <p className="instrument-label hidden sm:block">STATUS: READY</p>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="grid gap-4 p-5 md:grid-cols-4 md:items-end md:gap-5 md:p-8"
      >
        <label className="block space-y-2">
          <span className="instrument-label">Quel matériel utilisez-vous ?</span>
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              resetModel();
            }}
            className={selectClass}
          >
            <option value="">Sélectionner une marque</option>
            {options.map((o) => (
              <option key={o.brand} value={o.brand}>
                {o.brand}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="instrument-label">Quel modèle / quelle version ?</span>
          <select
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setVersion("");
              setSearched(false);
            }}
            disabled={!brand}
            className={selectClass}
          >
            <option value="">Sélectionner un modèle</option>
            {models.map((m) => (
              <option key={m.model} value={m.model}>
                {m.model}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="instrument-label">Version (si applicable)</span>
          <select
            value={version}
            onChange={(e) => {
              setVersion(e.target.value);
              setSearched(false);
            }}
            disabled={!model || versions.length === 0}
            className={selectClass}
          >
            <option value="">Toutes / N/A</option>
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit" disabled={!brand || !model} className="w-full">
          Voir les pièces
        </Button>
      </form>

      {searched && (
        <div className="border-t border-axiom-border p-5 md:p-8">
          <p className="instrument-label mb-4">
            RÉSULTATS · {results.length} produit{results.length !== 1 ? "s" : ""}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-axiom-border px-6 py-10 text-center">
              <p className="font-display text-lg font-semibold">
                Vous ne trouvez pas votre matériel ?
              </p>
              <p className="mt-2 text-sm text-axiom-muted">
                Nous pouvons étudier une pièce adaptée à votre équipement.
              </p>
              <Link href="/sur-mesure" className="mt-5 inline-block">
                <Button>Demander une pièce sur mesure</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const selectClass = cn(
  "w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2.5 text-sm text-axiom-text",
  "disabled:cursor-not-allowed disabled:opacity-40",
  "focus:border-axiom-accent focus:outline-none"
);
