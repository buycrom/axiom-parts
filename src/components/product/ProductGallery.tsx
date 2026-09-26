"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";
import { ZoomIn } from "lucide-react";

const typeLabels: Record<ProductImage["type"], string> = {
  alone: "Produit",
  installed: "Installé",
  situ: "En situation",
  dimensions: "Dimensions",
  detail: "Détail",
};

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group relative block w-full overflow-hidden border border-axiom-border bg-axiom-surface"
      >
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          <span className="instrument-label rounded bg-axiom-bg/80 px-2 py-1 backdrop-blur">
            {typeLabels[current.type]}
          </span>
        </div>
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded bg-axiom-bg/80 px-2 py-1 font-mono text-[10px] text-axiom-muted backdrop-blur">
            <ZoomIn className="h-3 w-3" /> ZOOM
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={`${img.type}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden border transition-colors",
                i === active
                  ? "border-axiom-accent"
                  : "border-axiom-border hover:border-axiom-muted"
              )}
              aria-label={img.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {zoomed && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[90vh] max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
