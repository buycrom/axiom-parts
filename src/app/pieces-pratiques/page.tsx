import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";

export const metadata: Metadata = {
  title: "Pièces pratiques",
  description:
    "Supports, adaptateurs, organisation et petites pièces utiles au quotidien.",
};

export default function PiecesPratiquesPage() {
  return (
    <CategoryPageShell
      code="CAT 03"
      title="Pièces pratiques"
      description="Supports, adaptateurs, organisation, petites pièces utiles."
      category="pieces-pratiques"
    />
  );
}
