import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/types";

const styles: Record<ProductBadge, string> = {
  nouveau: "bg-axiom-accent-dim text-axiom-accent border-axiom-accent/30",
  populaire: "bg-white/5 text-axiom-text border-axiom-border",
  pack: "bg-axiom-accent text-white border-transparent",
};

const labels: Record<ProductBadge, string> = {
  nouveau: "Nouveau",
  populaire: "Populaire",
  pack: "Pack",
};

export function Badge({
  type,
  className,
}: {
  type: ProductBadge;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        styles[type],
        className
      )}
    >
      {labels[type]}
    </span>
  );
}
