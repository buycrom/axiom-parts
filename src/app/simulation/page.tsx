import { redirect } from "next/navigation";

/** Ancienne URL — redirection vers Car Simulator */
export default function SimulationRedirect() {
  redirect("/car-sim");
}
