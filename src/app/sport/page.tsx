import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";

export const metadata: Metadata = {
  title: "Sport",
  description:
    "Pièces et accessoires pour tennis, rugby, football, basketball, golf, cyclisme et plus.",
};

export default function SportPage() {
  return (
    <CategoryPageShell
      code="CAT 03"
      title="Sport"
      description="Pièces et accessoires pour tennis, rugby, football et d'autres sports populaires."
      category="sport"
      showSportNav
    />
  );
}
