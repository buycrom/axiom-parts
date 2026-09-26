import type { Metadata } from "next";
import Link from "next/link";
import { getPackProducts, DEMO_DATA_NOTICE } from "@/data/products";
import { BundleCard } from "@/components/product/BundleCard";
import { Button } from "@/components/ui/Button";
import { lotDiscountTiers } from "@/lib/config";

export const metadata: Metadata = {
  title: "Packs",
  description:
    "Équipez votre setup avec des packs prêts à l'emploi, ou composez votre propre lot avec réduction.",
};

export default function PacksPage() {
  const packs = getPackProducts();

  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="instrument-label mb-2">BUNDLE</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Packs
          </h1>
          <p className="mt-2 max-w-xl text-axiom-muted">
            Des ensembles pensés pour compléter votre setup — ou créez le vôtre
            avec une réduction selon la quantité.
          </p>
          <p className="mt-3 font-mono text-[10px] text-axiom-muted/70">
            {DEMO_DATA_NOTICE}
          </p>
        </div>
        <div className="border border-axiom-border bg-axiom-surface p-5 lg:max-w-sm">
          <p className="instrument-label mb-2">LOT PERSONNALISÉ</p>
          <p className="font-display text-lg font-semibold">
            Composez votre propre lot
          </p>
          <p className="mt-1 text-sm text-axiom-muted">
            {lotDiscountTiers
              .slice()
              .sort((a, b) => a.minQuantity - b.minQuantity)
              .map((t) => `${t.minQuantity}+ → −${t.discountPercent}%`)
              .join(" · ")}
          </p>
          <Link href="/composer-lot" className="mt-4 inline-block">
            <Button>Composer un lot</Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <BundleCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
