import type { Metadata } from "next";
import { CategoryPageShell } from "@/components/product/CategoryPageShell";

export const metadata: Metadata = {
  title: "Flight Simulator",
  description:
    "Accessoires, protections, supports et pièces pour simulateur de vol.",
};

export default function FlightSimPage() {
  return (
    <CategoryPageShell
      code="CAT 01"
      title="Flight Simulator"
      description="Accessoires, protections, supports et pièces pour simulateur de vol."
      category="flight-sim"
    />
  );
}
