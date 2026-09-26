/**
 * Stub API — création session Stripe Checkout
 * Ne collectez jamais de données CB ici.
 */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const order = await request.json();
    console.info("[AXIOM API] /api/checkout — prêt pour Stripe", order);

    // Exemple d'intégration future :
    // const session = await stripe.checkout.sessions.create({ ... });
    // return NextResponse.json({ url: session.url });

    return NextResponse.json({
      ok: false,
      message: "Stripe non configuré. Ajoutez STRIPE_SECRET_KEY et créez une session.",
    }, { status: 501 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
