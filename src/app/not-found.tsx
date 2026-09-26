import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-axiom section-pad flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="instrument-label mb-3">ERROR · 404</p>
      <h1 className="font-display text-3xl font-semibold">Page introuvable</h1>
      <p className="mt-2 text-axiom-muted">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="mt-8">
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}
