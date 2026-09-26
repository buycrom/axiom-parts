import Link from "next/link";
import { getPopularProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DEMO_DATA_NOTICE } from "@/data/products";

export function PopularSection() {
  const products = getPopularProducts(4);

  return (
    <section className="border-y border-axiom-border bg-axiom-surface/50">
      <div className="container-axiom section-pad py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              code="CATALOG / 02"
              title="Les plus populaires"
              description="Des pièces qui résolvent un besoin concret — protection, maintien, organisation."
              className="mb-0"
            />
            <Link href="/boutique" className="shrink-0">
              <Button variant="outline">Voir tous les produits</Button>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="mb-6 mt-8 font-mono text-[10px] text-axiom-muted/70">
            {DEMO_DATA_NOTICE}
          </p>
          <ProductGrid products={products} />
        </Reveal>
      </div>
    </section>
  );
}
