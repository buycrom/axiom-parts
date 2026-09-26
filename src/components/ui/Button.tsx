import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-axiom-accent text-white hover:bg-axiom-accent-hover shadow-[0_0_0_0_transparent] hover:shadow-[0_8px_24px_rgba(255,107,44,0.25)]",
  secondary:
    "bg-axiom-elevated text-axiom-text border border-axiom-border hover:border-axiom-muted",
  ghost: "bg-transparent text-axiom-text hover:bg-axiom-elevated",
  outline:
    "bg-transparent border border-axiom-border text-axiom-text hover:border-axiom-accent hover:text-axiom-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
