"use client";

import { useState, type FormEvent } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { getProductById } from "@/data/products";
import Link from "next/link";

/**
 * Checkout prêt pour Stripe.
 * Ne stocke aucune donnée bancaire — le paiement sera délégué à Stripe Checkout / Elements.
 */
export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const [step, setStep] = useState<"info" | "done">("info");
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && step === "info") {
    return (
      <div className="border border-dashed border-axiom-border px-6 py-16 text-center">
        <p className="text-axiom-muted">Votre panier est vide.</p>
        <Link href="/boutique" className="mt-4 inline-block">
          <Button variant="outline">Retour à la boutique</Button>
        </Link>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="border border-axiom-border bg-axiom-surface px-6 py-16 text-center">
        <p className="instrument-label mb-3">ORDER · RECEIVED</p>
        <h1 className="font-display text-3xl font-semibold">
          Demande de commande enregistrée
        </h1>
        <p className="mx-auto mt-3 max-w-md text-axiom-muted">
          Prototype : aucune transaction réelle. Branchez Stripe pour activer le
          paiement sécurisé.
        </p>
        <Link href="/boutique" className="mt-8 inline-block">
          <Button>Continuer vos achats</Button>
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const orderPayload = {
      customer: {
        email: String(form.get("email")),
        firstName: String(form.get("firstName")),
        lastName: String(form.get("lastName")),
        phone: String(form.get("phone")),
      },
      shipping: {
        address: String(form.get("address")),
        city: String(form.get("city")),
        postalCode: String(form.get("postalCode")),
        country: String(form.get("country")),
      },
      shippingMethod: String(form.get("shipping")),
      items: items.map((i) => {
        const p = getProductById(i.productId);
        return {
          productId: i.productId,
          name: p?.name,
          quantity: i.quantity,
          unitPrice: p?.price,
        };
      }),
      subtotal,
      // payment: délégué à Stripe — ne jamais collecter de CB ici
    };

    try {
      // TODO Stripe :
      // const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify(orderPayload) });
      // const { url } = await res.json();
      // window.location.href = url; // Stripe Checkout Session
      console.info("[AXIOM] Checkout payload (prototype) :", orderPayload);
      await new Promise((r) => setTimeout(r, 700));
      clearCart();
      setStep("done");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p className="instrument-label">01 · Client</p>
          <h2 className="font-display text-xl font-semibold">
            Informations client
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="firstName" required placeholder="Prénom" className={inputClass} />
            <input name="lastName" required placeholder="Nom" className={inputClass} />
            <input name="email" type="email" required placeholder="Email" className={inputClass} />
            <input name="phone" type="tel" placeholder="Téléphone" className={inputClass} />
          </div>
        </section>

        <section className="space-y-4">
          <p className="instrument-label">02 · Adresse</p>
          <h2 className="font-display text-xl font-semibold">
            Adresse de livraison
          </h2>
          <input name="address" required placeholder="Adresse" className={inputClass} />
          <div className="grid gap-4 sm:grid-cols-3">
            <input name="postalCode" required placeholder="Code postal" className={inputClass} />
            <input name="city" required placeholder="Ville" className={inputClass} />
            <input name="country" required defaultValue="France" placeholder="Pays" className={inputClass} />
          </div>
        </section>

        <section className="space-y-4">
          <p className="instrument-label">03 · Livraison</p>
          <h2 className="font-display text-xl font-semibold">Mode de livraison</h2>
          <label className="flex cursor-pointer items-center gap-3 border border-axiom-border p-4 hover:border-axiom-muted">
            <input type="radio" name="shipping" value="standard" defaultChecked className="accent-axiom-accent" />
            <div>
              <p className="text-sm font-medium">Standard</p>
              <p className="font-mono text-xs text-axiom-muted">
                Délais à confirmer — tarif calculé à l&apos;intégration
              </p>
            </div>
          </label>
          <label className="flex cursor-pointer items-center gap-3 border border-axiom-border p-4 hover:border-axiom-muted">
            <input type="radio" name="shipping" value="express" className="accent-axiom-accent" />
            <div>
              <p className="text-sm font-medium">Express</p>
              <p className="font-mono text-xs text-axiom-muted">
                Option à activer selon votre transporteur
              </p>
            </div>
          </label>
        </section>

        <section className="space-y-4">
          <p className="instrument-label">04 · Paiement</p>
          <h2 className="font-display text-xl font-semibold">Paiement sécurisé</h2>
          <div className="border border-dashed border-axiom-border bg-axiom-surface p-5">
            <p className="text-sm text-axiom-muted">
              Le paiement sera traité par <strong className="text-axiom-text">Stripe</strong>{" "}
              (ou équivalent). Aucune donnée bancaire n&apos;est stockée sur ce site.
            </p>
            <p className="mt-2 font-mono text-[10px] text-axiom-muted">
              PAYMENT PROVIDER · PENDING INTEGRATION
            </p>
          </div>
        </section>
      </div>

      <aside className="h-fit border border-axiom-border bg-axiom-surface p-5 lg:sticky lg:top-24">
        <p className="instrument-label mb-4">Récapitulatif</p>
        <ul className="space-y-3 border-b border-axiom-border pb-4">
          {items.map((item) => {
            const p = getProductById(item.productId);
            if (!p) return null;
            return (
              <li key={`${item.productId}-${item.variantId}`} className="flex justify-between gap-2 text-sm">
                <span className="text-axiom-muted">
                  {item.quantity}× {p.name}
                </span>
                <span>{formatPrice(p.price * item.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-axiom-muted">Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-axiom-muted">Livraison</span>
            <span className="font-mono text-xs">À calculer</span>
          </div>
          <div className="flex justify-between border-t border-axiom-border pt-3 font-display text-lg font-semibold">
            <span>Total</span>
            <span className="text-axiom-accent">{formatPrice(subtotal)}</span>
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Traitement…" : "Confirmer la commande"}
        </Button>
        <p className="mt-3 text-center font-mono text-[10px] text-axiom-muted">
          Prototype — pas de paiement réel
        </p>
      </aside>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2.5 text-sm focus:border-axiom-accent focus:outline-none";
