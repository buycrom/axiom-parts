import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Pourquoi AXIOM existe : des pièces fonctionnelles conçues pour résoudre de vrais problèmes de setup.",
};

export default function AboutPage() {
  return (
    <div className="container-axiom section-pad py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="instrument-label mb-2">ABOUT / ORIGIN</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Des pièces nées de besoins réels
        </h1>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-axiom-muted md:text-lg">
          <p>
            AXIOM naît d&apos;un constat simple : sur un setup de simulation ou
            un poste technique, les petites pièces font souvent la différence —
            et elles manquent rarement « pour le style », mais pour résoudre un
            problème précis.
          </p>
          <p>
            Un cache qui protège un équipement hors usage. Un support qui
            stabilise. Un organiseur qui rend les câbles accessibles. Un
            adaptateur qui évite le bricolage. Chaque produit part d&apos;un
            usage concret, pas d&apos;une idée décorative.
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-axiom-text md:text-2xl">
              Comment les besoins sont identifiés
            </h2>
            <p className="mt-3">
              Les pièces sont imaginées à partir de situations de setup :
              installation, rangement, protection, ergonomie. Quand une
              incompatibilité ou un manque revient souvent, une pièce est
              étudiée.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-axiom-text md:text-2xl">
              Conception & fabrication
            </h2>
            <p className="mt-3">
              La conception privilégie la fonction : dimensions utiles,
              maintien, accessibilité, compatibilité clairement indiquée. La
              fabrication est soignée et adaptée à chaque référence — y compris
              les demandes sur mesure lorsque le catalogue ne couvre pas encore
              le besoin.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-axiom-text md:text-2xl">
              Ce que nous ne promettons pas
            </h2>
            <p className="mt-3">
              Pas de fausses certifications, pas de chiffres inventés, pas de
              compatibilités floues. Si une information n&apos;est pas encore
              confirmée, elle est laissée ouverte ou remplacée par une
              invitation à nous contacter.
            </p>
          </section>

          <p className="border-l-2 border-axiom-accent pl-5 font-display text-lg text-axiom-text md:text-xl">
            Pensé pour les passionnés qui veulent des pièces utiles — pas des
            gadgets.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/boutique">
            <Button>Voir la boutique</Button>
          </Link>
          <Link href="/sur-mesure">
            <Button variant="outline">Demander une pièce</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
