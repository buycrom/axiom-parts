"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FileBox, ImageIcon } from "lucide-react";

const MODEL_ACCEPT =
  ".stl,.3mf,.obj,.step,.stp,.iges,.igs,.amf,.zip,.rar";
const MODEL_HINT =
  "STL, 3MF, OBJ, STEP, IGES, AMF ou ZIP — max. recommandé 25 Mo";

/**
 * Formulaire devis sur mesure.
 * Envoie FormData (texte + photo + fichier 3D) vers /api/quote.
 */
export function CustomQuoteForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [modelName, setModelName] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("type", "custom-quote");
    data.set("createdAt", new Date().toISOString());

    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      if (!res.ok) throw new Error("quote failed");
      setStatus("success");
      form.reset();
      setModelName(null);
      setImageName(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-5", className)}
      encType="multipart/form-data"
    >
      <p className="instrument-label">QUOTE · REQUEST</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <Field
        label="Description du besoin"
        name="description"
        as="textarea"
        required
        placeholder="Décrivez la pièce et le problème à résoudre…"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Matériel concerné"
          name="equipment"
          placeholder="Marque, modèle, version…"
        />
        <Field
          label="Dimensions"
          name="dimensions"
          placeholder="L × l × H (mm) si connues"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Quantité"
          name="quantity"
          type="number"
          min="1"
          defaultValue="1"
        />
        <div />
      </div>

      {/* Fichier 3D */}
      <div className="rounded-md border border-dashed border-axiom-border bg-axiom-bg p-4">
        <label htmlFor="model3d" className="mb-2 flex items-center gap-2 text-sm font-medium">
          <FileBox className="h-4 w-4 text-axiom-accent" />
          Fichier 3D à envoyer
          <span className="font-normal text-axiom-muted">(recommandé)</span>
        </label>
        <input
          id="model3d"
          type="file"
          name="model3d"
          accept={MODEL_ACCEPT}
          className={inputClass}
          onChange={(e) =>
            setModelName(e.target.files?.[0]?.name ?? null)
          }
        />
        <p className="mt-1 font-mono text-[10px] text-axiom-muted">
          {MODEL_HINT}
        </p>
        {modelName && (
          <p className="mt-2 text-sm text-axiom-accent">Fichier : {modelName}</p>
        )}
      </div>

      {/* Photo / schéma */}
      <div>
        <label htmlFor="image" className="mb-2 flex items-center gap-2 text-sm font-medium">
          <ImageIcon className="h-4 w-4 text-axiom-muted" />
          Photo / schéma
        </label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*,.pdf"
          className={inputClass}
          onChange={(e) =>
            setImageName(e.target.files?.[0]?.name ?? null)
          }
        />
        <p className="mt-1 font-mono text-[10px] text-axiom-muted">
          JPG, PNG ou PDF — max. recommandé 5 Mo
        </p>
        {imageName && (
          <p className="mt-2 text-sm text-axiom-muted">Fichier : {imageName}</p>
        )}
      </div>

      <Field label="Message" name="message" as="textarea" rows={3} />

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Envoi…" : "Demander un devis"}
      </Button>

      {status === "success" && (
        <p className="text-sm text-axiom-success" role="status">
          Demande enregistrée. Le fichier 3D et les infos seront transmis au
          propriétaire (branchez l&apos;envoi email dans /api/quote).
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500" role="alert">
          Une erreur est survenue. Réessayez ou contactez-nous par email.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  as,
  type = "text",
  required,
  placeholder,
  rows = 4,
  min,
  defaultValue,
}: {
  label: string;
  name: string;
  as?: "textarea";
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  min?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-axiom-accent"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          min={min}
          defaultValue={defaultValue}
          className={inputClass}
        />
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2.5 text-sm text-axiom-text placeholder:text-axiom-muted focus:border-axiom-accent focus:outline-none";
