import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";

export const metadata: Metadata = {
  title: "Car Simulator",
  description:
    "Accessoires pour setups sim racing et équipements automobile.",
};

export default function CarSimPage() {
  return (
    <CategoryPageShell
      code="CAT 02"
      title="Car Simulator"
      description="Accessoires pour setups sim racing et équipements automobile."
      category="car-sim"
    />
  );
}
