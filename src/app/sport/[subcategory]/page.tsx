import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";
import {
  getSportSubcategory,
  sportSubcategories,
} from "@/data/categories";

export function generateStaticParams() {
  return sportSubcategories.map((s) => ({ subcategory: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const sub = getSportSubcategory(subcategory);
  if (!sub) return { title: "Sport" };
  return {
    title: `${sub.label} — Sport`,
    description: sub.description,
  };
}

export default async function SportSubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;
  const sub = getSportSubcategory(subcategory);
  if (!sub) notFound();

  return (
    <CategoryPageShell
      code="SPORT"
      title={sub.label}
      description={sub.description}
      category="sport"
      sportSubcategory={sub.id}
      showSportNav
    />
  );
}
