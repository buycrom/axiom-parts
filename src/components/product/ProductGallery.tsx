"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  const current = images[active] ?? images[0];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const goPrev = useCallback(() => {
    setActive((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActive((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, goPrev, goNext]);

  if (!current) return null;

  const lightbox =
    mounted &&
    zoomed &&
    createPortal(
      <div
        className="fixed inset-0 z-[90] flex flex-col bg-black/95"
        role="dialog"
        aria-modal="true"
        aria-label="Galerie plein écran"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-mono text-xs text-white/60">
            {typeLabels[current.type]} · {active + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-20">
          {hasMultiple && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-full max-w-full object-contain"
          />

          {hasMultiple && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {hasMultiple && (
          <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
            {images.map((img, i) => (
              <button
                key={`lb-${img.type}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "h-14 w-14 shrink-0 overflow-hidden rounded border-2 transition-colors sm:h-16 sm:w-16",
                  i === active
                    ? "border-axiom-accent"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
                aria-label={img.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>,
      document.body
    );

  return (
    <div className="space-y-3">
      <div className="group relative border border-axiom-border bg-axiom-surface">
        <div className="absolute left-3 top-3 z-10">
          <span className="instrument-label rounded bg-axiom-bg/80 px-2 py-1 backdrop-blur">
            {typeLabels[current.type]}
          </span>
        </div>

        {hasMultiple && (
          <p className="absolute right-3 top-3 z-10 rounded bg-axiom-bg/80 px-2 py-1 font-mono text-[10px] text-axiom-muted backdrop-blur">
            {active + 1} / {images.length}
          </p>
        )}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="relative flex aspect-square w-full items-center justify-center bg-axiom-elevated/40"
          aria-label="Agrandir l'image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-full max-w-full object-contain p-2"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded bg-axiom-bg/80 px-2 py-1 font-mono text-[10px] text-axiom-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-3 w-3" /> ZOOM
          </span>
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-axiom-border bg-axiom-bg/90 text-axiom-text shadow-lg transition-colors hover:border-axiom-accent hover:text-axiom-accent"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-axiom-border bg-axiom-bg/90 text-axiom-text shadow-lg transition-colors hover:border-axiom-accent hover:text-axiom-accent"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={`${img.type}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden border bg-axiom-elevated/30 transition-colors",
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

      {lightbox}
    </div>
  );
}
