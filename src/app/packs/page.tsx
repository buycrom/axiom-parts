import type { Metadata } from "next";
import { getPackProducts, DEMO_DATA_NOTICE } from "@/data/products";
import { BundleCard } from "@/components/product/BundleCard";

export const metadata: Metadata = {
  title: "Packs",
  description:
    "Équipez votre setup avec des packs cohérents : protection, organisation, cockpit.",
};

export default function PacksPage() {
  const packs = getPackProducts();

  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-10">
        <p className="instrument-label mb-2">BUNDLE</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Packs
        </h1>
        <p className="mt-2 max-w-xl text-axiom-muted">
          Des ensembles pensés pour compléter votre setup — prix pack vs produits
          séparés affiché clairement.
        </p>
        <p className="mt-3 font-mono text-[10px] text-axiom-muted/70">
          {DEMO_DATA_NOTICE}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <BundleCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
