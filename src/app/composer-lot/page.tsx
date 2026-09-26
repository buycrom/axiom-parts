import type { Metadata } from "next";
import { LotBuilder } from "@/components/lot/LotBuilder";
import { lotDiscountTiers } from "@/lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Composer un lot",
  description:
    "Composez votre propre lot de pièces et bénéficiez d'une réduction selon la quantité.",
};

export default function ComposerLotPage() {
  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-10 max-w-2xl">
        <p className="instrument-label mb-2">LOT · BUILDER</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Composez votre lot
        </h1>
        <p className="mt-3 text-axiom-muted">
          Sélectionnez plusieurs produits ou packs. La réduction se calcule
          automatiquement selon le nombre d&apos;articles.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {lotDiscountTiers
            .slice()
            .sort((a, b) => a.minQuantity - b.minQuantity)
            .map((t) => (
              <li
                key={t.minQuantity}
                className="rounded-md border border-axiom-border px-3 py-1.5 font-mono text-xs text-axiom-muted"
              >
                {t.minQuantity}+ → −{t.discountPercent}%
              </li>
            ))}
        </ul>
        <p className="mt-3 text-sm text-axiom-muted">
          Preferez un pack déjà prêt ?{" "}
          <Link href="/packs" className="text-axiom-accent hover:underline">
            Voir les packs
          </Link>
        </p>
      </div>
      <LotBuilder />
    </div>
  );
}
