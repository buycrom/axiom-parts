/**
 * Stub API — devis sur mesure + fichiers (photo, modèle 3D).
 * Branchez ici un stockage (S3, Blob) + email (Resend, etc.) pour
 * transmettre la demande au propriétaire de la boutique.
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** ~25 Mo — ajuster selon votre hébergeur */
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const fields = {
      type: String(form.get("type") ?? "custom-quote"),
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      description: String(form.get("description") ?? ""),
      equipment: String(form.get("equipment") ?? ""),
      dimensions: String(form.get("dimensions") ?? ""),
      quantity: String(form.get("quantity") ?? ""),
      message: String(form.get("message") ?? ""),
      createdAt: String(form.get("createdAt") ?? new Date().toISOString()),
    };

    const image = form.get("image");
    const model3d = form.get("model3d");

    const attachments: {
      field: string;
      name: string;
      size: number;
      type: string;
    }[] = [];

    if (image instanceof File && image.size > 0) {
      attachments.push({
        field: "image",
        name: image.name,
        size: image.size,
        type: image.type,
      });
      // TODO: await uploadToStorage(image)
    }

    if (model3d instanceof File && model3d.size > 0) {
      attachments.push({
        field: "model3d",
        name: model3d.name,
        size: model3d.size,
        type: model3d.type || "application/octet-stream",
      });
      // TODO: await uploadToStorage(model3d)
      // TODO: await sendEmailToOwner({ fields, attachments })
    }

    console.info("[AXIOM API] /api/quote", { fields, attachments });

    return NextResponse.json({
      ok: true,
      message: "Demande reçue",
      attachments: attachments.map((a) => a.name),
    });
  } catch (err) {
    console.error("[AXIOM API] /api/quote error", err);
    return NextResponse.json(
      { ok: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
