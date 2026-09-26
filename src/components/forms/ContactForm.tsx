"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    const payload = {
      type: "contact" as const,
      name: String(data.get("name")),
      email: String(data.get("email")),
      subject: String(data.get("subject")),
      message: String(data.get("message")),
      createdAt: new Date().toISOString(),
    };
    // await fetch("/api/contact", …)
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="instrument-label">CONTACT · FORM</p>
      <input
        name="name"
        required
        placeholder="Nom"
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={inputClass}
      />
      <input
        name="subject"
        required
        placeholder="Sujet"
        className={inputClass}
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Votre message"
        className={inputClass}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-axiom-success" role="status">
          Message enregistré (prototype). Branchez l&apos;API pour l&apos;envoi réel.
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2.5 text-sm focus:border-axiom-accent focus:outline-none";
