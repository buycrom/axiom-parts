import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalisez votre commande AXIOM.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-axiom section-pad py-10 md:py-14">
      <p className="instrument-label mb-2">CHECKOUT</p>
      <h1 className="font-display mb-10 text-3xl font-semibold md:text-4xl">
        Passer commande
      </h1>
      <CheckoutForm />
    </div>
  );
}
