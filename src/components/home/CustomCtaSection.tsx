import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { trustPoints } from "@/data/categories";

export function CustomCtaSection() {
  return (
    <section className="container-axiom section-pad py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden border border-axiom-border bg-axiom-elevated px-6 py-12 md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,107,44,0.1),transparent_50%)]" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                code="CUSTOM / 05"
                title="Vous ne trouvez pas votre pièce ?"
                description="Envoyez-nous votre besoin, une photo et quelques dimensions. Nous étudierons la possibilité de fabriquer une pièce adaptée."
                className="mb-0"
              />
              <Link href="/sur-mesure" className="mt-8 inline-block">
                <Button size="lg">Demander un devis</Button>
              </Link>
            </div>
            <ul className="space-y-4 border-t border-axiom-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 font-mono text-axiom-accent">✓</span>
                  <span className="text-sm text-axiom-muted md:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
