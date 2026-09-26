"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks, siteConfig } from "@/lib/config";
import { useCartStore } from "@/lib/cart-store";
import { SearchBar } from "@/components/ui/SearchBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";

type NavLink = (typeof navLinks)[number];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileSportOpen, setMobileSportOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[100] xl:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col border-r border-axiom-border bg-axiom-bg shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-modal={mobileOpen}
          aria-label="Menu de navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-axiom-border px-4">
            <span className="font-display text-lg font-bold">
              {siteConfig.name}
            </span>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="rounded p-2 text-axiom-muted hover:bg-axiom-elevated hover:text-axiom-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <MobileNavItem
                key={link.href}
                link={link}
                sportOpen={mobileSportOpen}
                onToggleSport={() => setMobileSportOpen((v) => !v)}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
            <Link
              href="/composer-lot"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-base text-axiom-muted hover:bg-axiom-elevated"
            >
              Composer un lot
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-base text-axiom-muted hover:bg-axiom-elevated"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>,
      document.body
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-axiom-border bg-axiom-bg/95 backdrop-blur-md"
          : "border-transparent bg-axiom-bg/80 backdrop-blur-sm"
      )}
    >
      <div className="container-axiom section-pad">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded p-2 text-axiom-text xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-display text-xl font-bold tracking-tight md:text-2xl">
                {siteConfig.name}
              </span>
              <span className="hidden font-mono text-[10px] tracking-widest text-axiom-muted sm:inline">
                SYSTEM
              </span>
            </Link>
          </div>

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Principal"
          >
            {navLinks.map((link) => (
              <DesktopNavItem key={link.href} link={link} />
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded p-2 text-axiom-muted transition-colors hover:text-axiom-text"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded p-2 text-axiom-muted transition-colors hover:text-axiom-text"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-axiom-accent px-1 font-mono text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-axiom-border py-3">
            <SearchBar onClose={() => setSearchOpen(false)} autoFocus />
          </div>
        )}
      </div>

      {mobileMenu}
    </header>
  );
}

function DesktopNavItem({ link }: { link: NavLink }) {
  if (!("children" in link) || !link.children) {
    return (
      <Link
        href={link.href}
        className="rounded-md px-2 py-2 text-[13px] text-axiom-muted transition-colors hover:text-axiom-text"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={link.href}
        className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-[13px] text-axiom-muted transition-colors hover:text-axiom-text"
      >
        {link.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-[200px] pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-md border border-axiom-border bg-axiom-surface py-1 shadow-xl">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-axiom-muted transition-colors hover:bg-axiom-elevated hover:text-axiom-text"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({
  link,
  sportOpen,
  onToggleSport,
  onNavigate,
}: {
  link: NavLink;
  sportOpen: boolean;
  onToggleSport: () => void;
  onNavigate: () => void;
}) {
  if (!("children" in link) || !link.children) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base text-axiom-text hover:bg-axiom-elevated"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggleSport}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base text-axiom-text hover:bg-axiom-elevated"
        aria-expanded={sportOpen}
      >
        {link.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-axiom-muted transition-transform",
            sportOpen && "rotate-180"
          )}
        />
      </button>
      {sportOpen && (
        <div className="ml-2 space-y-0.5 border-l border-axiom-border pl-2">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2.5 text-sm text-axiom-muted hover:bg-axiom-elevated hover:text-axiom-text"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
