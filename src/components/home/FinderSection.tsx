import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function FinderSection() {
  return (
    <section id="trouver" className="border-y border-axiom-border bg-axiom-surface/40">
      <div className="container-axiom section-pad py-16 md:py-24">
        <Reveal>
          <SectionHeader
            code="FINDER / 04"
            title="Trouvez votre pièce"
            description="Vous ne connaissez pas le nom du produit ? Indiquez votre matériel — nous listons les pièces compatibles."
          />
        </Reveal>
        <Reveal delay={80}>
          <ProductConfigurator />
        </Reveal>
      </div>
    </section>
  );
}
