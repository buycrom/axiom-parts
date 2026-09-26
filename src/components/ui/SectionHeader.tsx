import { cn } from "@/lib/utils";

export function SectionHeader({
  code,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  code?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {code && (
        <p className={cn("instrument-label mb-3", light && "text-black/40")}>
          {code}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem]",
          light ? "text-axiom-cream-text" : "text-axiom-text"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-xl text-base leading-relaxed md:text-lg",
            align === "center" && "mx-auto",
            light ? "text-black/55" : "text-axiom-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
