import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";

export const metadata: Metadata = {
  title: "Simulation",
  description:
    "Accessoires pour setups et équipements de simulation.",
};

export default function SimulationPage() {
  return (
    <CategoryPageShell
      code="CAT 02"
      title="Simulation"
      description="Accessoires pour setups et équipements de simulation."
      category="simulation"
    />
  );
}
