import { CatalogClient } from "@/components/product/CatalogClient";
import Link from "next/link";
import { sportSubcategories } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategoryPageShell({
  code,
  title,
  description,
  category,
  sportSubcategory,
  showSportNav = false,
}: {
  code: string;
  title: string;
  description: string;
  category: string;
  sportSubcategory?: string;
  showSportNav?: boolean;
}) {
  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <div className="mb-10">
        <p className="instrument-label mb-2">{code}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-axiom-muted">{description}</p>
      </div>

      {(showSportNav || category === "sport") && (
        <div className="mb-8 flex flex-wrap gap-2">
          <SubLink
            href="/sport"
            label="Tous"
            active={!sportSubcategory}
          />
          {sportSubcategories.map((sub) => (
            <SubLink
              key={sub.id}
              href={`/sport/${sub.id}`}
              label={sub.label}
              active={sportSubcategory === sub.id}
            />
          ))}
        </div>
      )}

      <CatalogClient
        initialCategory={category}
        initialSportSubcategory={sportSubcategory}
      />
    </div>
  );
}

function SubLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-axiom-accent bg-axiom-accent-dim text-axiom-accent"
          : "border-axiom-border text-axiom-muted hover:border-axiom-muted hover:text-axiom-text"
      )}
    >
      {label}
    </Link>
  );
}
