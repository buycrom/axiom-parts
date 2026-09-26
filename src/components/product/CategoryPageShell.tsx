import { CatalogClient } from "@/components/product/CatalogClient";

export function CategoryPageShell({
  code,
  title,
  description,
  category,
}: {
  code: string;
  title: string;
  description: string;
  category: string;
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
      <CatalogClient initialCategory={category} />
    </div>
  );
}
