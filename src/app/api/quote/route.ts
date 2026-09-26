/**
 * Stub API — devis sur mesure
 * Branchez ici email (Resend, SendGrid…) ou votre backend.
 */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let payload: unknown;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    } else {
      payload = await request.json();
    }

    // TODO: envoyer l'email / créer un ticket
    console.info("[AXIOM API] /api/quote", payload);

    return NextResponse.json({ ok: true, message: "Demande reçue" });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
