import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function CategoriesSection() {
  return (
    <section className="container-axiom section-pad py-16 md:py-24">
      <Reveal>
        <SectionHeader
          code="NAV / 01"
          title="Que cherchez-vous ?"
          description="Choisissez une direction — chaque catégorie regroupe des pièces pensées pour un usage précis."
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 80}>
            <CategoryCard
              code={cat.code}
              title={cat.title}
              description={cat.description}
              href={cat.href}
              index={i}
            />
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center">
        <Link
          href="/boutique"
          className="font-mono text-xs uppercase tracking-wider text-axiom-muted underline-offset-4 hover:text-axiom-accent hover:underline"
        >
          Ou parcourir toute la boutique →
        </Link>
      </p>
    </section>
  );
}
