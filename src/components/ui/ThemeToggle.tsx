"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={
        className ??
        "rounded p-2 text-axiom-muted transition-colors hover:text-axiom-text"
      }
      aria-label={
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      }
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
