import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/config";
import { trustPoints } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-axiom-border bg-axiom-surface">
      <div className="container-axiom section-pad py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-axiom-muted">
              {siteConfig.description}
            </p>
            <p className="mt-4 instrument-label">ENGINEERING · PRECISION</p>
          </div>

          <div>
            <p className="instrument-label mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-axiom-muted transition-colors hover:text-axiom-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="instrument-label mb-4">Aide</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-axiom-muted hover:text-axiom-text"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#faq"
                  className="text-sm text-axiom-muted hover:text-axiom-text"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/sur-mesure"
                  className="text-sm text-axiom-muted hover:text-axiom-text"
                >
                  Pièce sur mesure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="instrument-label mb-4">Engagements</p>
            <ul className="space-y-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-axiom-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-axiom-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-axiom-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-axiom-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="font-mono text-[10px] text-axiom-muted">
            {siteConfig.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
