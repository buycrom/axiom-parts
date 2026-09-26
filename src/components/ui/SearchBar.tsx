"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Search, X } from "lucide-react";

export function SearchBar({
  onClose,
  autoFocus,
}: {
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(
    () => (query.trim().length >= 2 ? searchProducts(query).slice(0, 6) : []),
    [query]
  );

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-md border border-axiom-border bg-axiom-elevated px-3">
        <Search className="h-4 w-4 shrink-0 text-axiom-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une pièce, un équipement…"
          className="h-11 w-full bg-transparent text-sm text-axiom-text placeholder:text-axiom-muted focus:outline-none"
          aria-label="Rechercher"
        />
        {(query || onClose) && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onClose?.();
            }}
            className="p-1 text-axiom-muted hover:text-axiom-text"
            aria-label="Fermer la recherche"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-axiom-border bg-axiom-surface shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-axiom-muted">
              Aucun résultat pour « {query} »
            </p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/produit/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-axiom-elevated"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]?.src}
                      alt=""
                      className="h-10 w-10 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="truncate text-xs text-axiom-muted">
                        {p.shortDescription}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-axiom-accent">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`/boutique?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="block border-t border-axiom-border px-4 py-3 text-center text-sm text-axiom-accent hover:bg-axiom-elevated"
          >
            Voir tous les résultats
          </Link>
        </div>
      )}
    </div>
  );
}
