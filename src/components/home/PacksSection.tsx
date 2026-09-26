import { getPackProducts } from "@/data/products";
import { BundleCard } from "@/components/product/BundleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PacksSection() {
  const packs = getPackProducts();

  return (
    <section className="container-axiom section-pad py-16 md:py-24">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            code="BUNDLE / 03"
            title="Équipez votre setup"
            description="Des packs prêts à l'emploi, ou composez votre lot avec réduction selon la quantité."
            className="mb-0"
          />
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/composer-lot">
              <Button>Composer un lot</Button>
            </Link>
            <Link href="/packs">
              <Button variant="outline">Tous les packs</Button>
            </Link>
          </div>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack, i) => (
          <Reveal key={pack.id} delay={i * 80}>
            <BundleCard pack={pack} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
