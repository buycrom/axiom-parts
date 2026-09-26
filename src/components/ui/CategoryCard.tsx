import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryCard({
  code,
  title,
  description,
  href,
  index,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
  index?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[220px] flex-col justify-between overflow-hidden border border-axiom-border bg-axiom-surface p-6 transition-all duration-300",
        "hover:border-axiom-accent/50 hover:bg-axiom-elevated md:min-h-[260px] md:p-8"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,44,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="instrument-label">{code}</span>
          <ArrowUpRight className="h-4 w-4 text-axiom-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-axiom-accent" />
        </div>
        {typeof index === "number" && (
          <p className="mt-6 font-mono text-4xl text-axiom-border transition-colors group-hover:text-axiom-accent/30">
            {String(index + 1).padStart(2, "0")}
          </p>
        )}
      </div>

      <div className="relative mt-auto">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-axiom-muted">
          {description}
        </p>
      </div>
    </Link>
  );
}
