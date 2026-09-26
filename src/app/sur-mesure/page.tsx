import type { Metadata } from "next";
import { CustomQuoteForm } from "@/components/forms/CustomQuoteForm";

export const metadata: Metadata = {
  title: "Sur mesure",
  description:
    "Demandez une pièce personnalisée : décrivez votre besoin, joignez une photo et des dimensions.",
};

export default function SurMesurePage() {
  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="instrument-label mb-2">CUSTOM / 04</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Vous ne trouvez pas votre pièce ?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-axiom-muted md:text-lg">
            Envoyez-nous votre besoin, une photo et quelques dimensions. Nous
            étudierons la possibilité de fabriquer une pièce adaptée.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-axiom-muted">
            <li className="flex gap-2">
              <span className="text-axiom-accent">01</span>
              Décrivez le problème à résoudre
            </li>
            <li className="flex gap-2">
              <span className="text-axiom-accent">02</span>
              Indiquez le matériel et les dimensions
            </li>
            <li className="flex gap-2">
              <span className="text-axiom-accent">03</span>
              Joignez une photo ou un schéma
            </li>
            <li className="flex gap-2">
              <span className="text-axiom-accent">04</span>
              Nous revenons vers vous pour un devis
            </li>
          </ul>
        </div>
        <div className="border border-axiom-border bg-axiom-surface p-6 md:p-8">
          <CustomQuoteForm />
        </div>
      </div>
    </div>
  );
}
