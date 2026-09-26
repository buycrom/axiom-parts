import type { Metadata } from "next";
import { CatalogClient } from "@/components/product/CatalogClient";
import { DEMO_DATA_NOTICE } from "@/data/products";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Parcourez les pièces fonctionnelles AXIOM : protections, supports, organisation, packs et accessoires pour setups de simulation.",
};

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categorie?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-10">
        <p className="instrument-label mb-2">CATALOG</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Boutique
        </h1>
        <p className="mt-2 max-w-xl text-axiom-muted">
          Trouvez la pièce qui résout votre besoin — filtrez par catégorie,
          compatibilité ou type.
        </p>
        <p className="mt-3 font-mono text-[10px] text-axiom-muted/70">
          {DEMO_DATA_NOTICE}
        </p>
      </div>
      <CatalogClient
        initialQuery={params.q}
        initialCategory={params.categorie}
      />
    </div>
  );
}
