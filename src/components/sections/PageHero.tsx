import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionHeading";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Masthead for every inner route.
 *
 * No Figma artboard exists for the inner pages, so this reuses the home hero's
 * own parts — the gold section badge, the 56px cream/gold headline scale and
 * the dimmed 18px lede — on the darker `hh-deep` ground the design already
 * uses for cards, so the band reads as a header rather than a new section.
 */
export function PageHero({
  badge,
  title,
  highlight,
  description,
  trail,
  children,
}: {
  badge: string;
  title: string;
  /** Trailing fragment of the headline rendered in gold, as in the home hero. */
  highlight?: string;
  description: string;
  trail: Crumb[];
  /** Optional row of meta chips beneath the lede. */
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--hh-hairline)] bg-hh-deep py-12 lg:py-[72px]">
      <Container className="flex flex-col items-start gap-6">
        <Breadcrumbs trail={trail} />

        <SectionBadge>{badge}</SectionBadge>

        <h1 className="max-w-[900px] text-[32px] font-bold leading-[1.15] text-hh-cream sm:text-[40px] lg:text-[52px]">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-hh-gold">{highlight}</span>
            </>
          )}
        </h1>

        <p className="max-w-[760px] text-[16px] leading-[1.6] text-[var(--hh-dim)] lg:text-[18px]">
          {description}
        </p>

        {children}
      </Container>
    </section>
  );
}
