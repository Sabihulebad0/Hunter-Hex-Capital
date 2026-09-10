"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * "Home" is only current at the root; every other route also owns its children,
 * so `/products/foo` still lights up Products.
 */
function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Figma node 45:3 — 88px tall, 80px gutters, gold hairline underneath.
 *
 * The design has no mobile frame, so below `lg` the nav collapses into a drawer
 * while the logo and CTA keep their designed proportions.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer on navigation so a hash link doesn't leave it hanging open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll behind the open drawer.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hh-hairline)] bg-hh-green">
      {/* Gutters track Container so the logo lines up with section content. */}
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-10 xl:px-[80px]">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/images/logo.webp"
            alt={site.legalName}
            width={174}
            height={64}
            priority
            className="h-[44px] w-auto lg:h-[64px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const current = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "text-[15px] font-medium transition-colors hover:text-hh-gold",
                  current ? "text-hh-gold" : "text-hh-cream",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-[8px] border border-hh-gold-dark bg-hh-gold px-[28px] py-[14px] text-[16px] font-bold text-hh-green hh-glow transition-colors hover:bg-[#e3c88a] lg:inline-flex"
          >
            Speak With a Specialist
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[8px] border border-[var(--hh-hairline)] text-hh-cream lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-[var(--hh-hairline)] bg-hh-deep lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-4 sm:px-8">
          {navLinks.map((link) => {
            const current = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "border-b border-[var(--hh-hairline)] py-3 text-[16px] font-medium last:border-b-0 hover:text-hh-gold",
                  current ? "text-hh-gold" : "text-hh-cream",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-[8px] border border-hh-gold-dark bg-hh-gold px-[28px] py-[14px] text-[16px] font-bold text-hh-green"
          >
            Speak With a Specialist
          </Link>
        </nav>
      </div>
    </header>
  );
}
