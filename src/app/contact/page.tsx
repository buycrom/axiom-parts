import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQ } from "@/components/ui/FAQ";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez AXIOM pour une question produit, une compatibilité ou une demande sur mesure.",
};

export default function ContactPage() {
  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-12">
        <p className="instrument-label mb-2">CONTACT</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Contact
        </h1>
        <p className="mt-2 max-w-xl text-axiom-muted">
          Une question sur une pièce, une compatibilité ou un devis ? Écrivez-nous.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="border border-axiom-border bg-axiom-surface p-6">
            <p className="instrument-label mb-2">EMAIL</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display text-lg text-axiom-accent hover:underline"
            >
              {siteConfig.email}
            </a>
            <p className="mt-4 text-sm text-axiom-muted">
              Remplacez cette adresse par votre email réel dans{" "}
              <code className="font-mono text-xs">src/lib/config.ts</code>.
            </p>
          </div>
          <div className="border border-axiom-border bg-axiom-surface p-6 md:p-8">
            <ContactForm />
          </div>
        </div>

        <div id="faq">
          <p className="instrument-label mb-2">FAQ</p>
          <h2 className="font-display mb-6 text-2xl font-semibold">
            Questions fréquentes
          </h2>
          <FAQ />
          <p className="mt-4 font-mono text-[10px] text-axiom-muted">
            Réponses modifiables dans src/data/faq.ts
          </p>
        </div>
      </div>
    </div>
  );
}
