import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Trail shown at the top of every inner page.
 *
 * Figma has no artboard for the inner routes, so this is composed from the
 * approved H1-R1 vocabulary only — 14px meta type in the muted tone, the gold
 * accent for the current page, and the same chevron weight as the section CTAs.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-hh-muted lg:text-[14px]">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-hh-gold"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-hh-gold" aria-current="page">
                  {crumb.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-hh-gold-dark/60"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
