import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Reveal } from "@/components/ui/Reveal";

const techTags = [
  "Designed for simulation",
  "Functional parts",
  "Made to order",
  "Clear compatibility",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-axiom-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,107,44,0.12),transparent_50%),linear-gradient(to_bottom,transparent,rgba(14,16,19,0.4))]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-axiom section-pad relative grid items-center gap-10 py-14 md:gap-12 md:py-20 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="instrument-label mb-4">SYSTEM / FLIGHT · STATUS: READY</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
            Des pièces qui améliorent{" "}
            <span className="text-axiom-accent">votre setup</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-axiom-muted md:text-lg">
            Pièces fonctionnelles, accessoires et protections conçus pour les
            passionnés.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/boutique">
              <Button size="lg">Découvrir la boutique</Button>
            </Link>
            <Link href="/#trouver">
              <Button size="lg" variant="outline">
                Trouver ma pièce
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-axiom-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="absolute -left-2 -top-2 z-10 hidden rounded border border-axiom-border bg-axiom-bg/90 px-2 py-1 font-mono text-[10px] text-axiom-muted backdrop-blur sm:block">
              MODEL: SETUP_01
            </div>
            <div className="absolute -bottom-2 -right-2 z-10 hidden rounded border border-axiom-border bg-axiom-bg/90 px-2 py-1 font-mono text-[10px] text-axiom-accent backdrop-blur sm:block">
              COMPATIBILITY: LISTED
            </div>
            {/* Emplacement image hero — remplacer par photo réelle de produits en situation */}
            <ProductPlaceholder
              label="Produits en situation réelle"
              aspect="wide"
              className="min-h-[280px] sm:min-h-[360px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
