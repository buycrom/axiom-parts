import { cn } from "@/lib/utils";

export function ProductPlaceholder({
  label = "Image produit",
  className,
  aspect = "square",
}: {
  label?: string;
  className?: string;
  aspect?: "square" | "video" | "wide";
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-axiom-elevated",
        aspect === "square" && "aspect-square",
        aspect === "video" && "aspect-video",
        aspect === "wide" && "aspect-[16/10]",
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,107,44,0.04)_100%)]" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-axiom-border/60 px-3 py-2">
        <span className="instrument-label">IMG / PLACEHOLDER</span>
        <span className="instrument-label">READY</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="h-px w-12 bg-axiom-accent/60" />
        <p className="font-display text-sm font-medium text-axiom-muted">
          {label}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-axiom-muted/60">
          Remplacer par photo réelle
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-axiom-border/60 px-3 py-2">
        <span className="instrument-label">AXIOM · MEDIA SLOT</span>
      </div>
    </div>
  );
}
