"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <CartDrawer />
    </ThemeProvider>
  );
}
