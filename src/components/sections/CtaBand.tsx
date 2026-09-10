import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Closing call-to-action for the inner routes.
 *
 * Built from the approved card treatment — `hh-deep` ground, gold border, the
 * gold glow already carried by the primary button — so it reads as the same
 * family as the "Request Your Free Investment Guide" card (Figma 45:409).
 */
export function CtaBand({
  title = "Ready to Move Part of Your Portfolio Into Physical Metals?",
  description = "Speak with a specialist about allocation, IRA eligibility, delivery and segregated storage. No obligation, and no pressure.",
  primary = { label: "Speak With a Specialist", href: "/contact" },
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-hh-green pb-16 lg:pb-[100px]">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-[16px] border border-hh-gold-dark bg-hh-deep px-6 py-12 text-center hh-glow lg:px-16 lg:py-[64px]">
          <h2 className="max-w-[760px] text-[26px] font-bold leading-[1.25] text-hh-cream sm:text-[32px] lg:text-[36px]">
            {title}
          </h2>

          <p className="max-w-[640px] text-[16px] leading-[1.6] text-[var(--hh-dim)]">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2">
            <li className="flex items-center gap-2">
              <Phone size={18} className="shrink-0 text-hh-gold" aria-hidden />
              <a
                href={site.phoneHref}
                className="text-[15px] font-bold text-hh-cream hover:text-hh-gold"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="shrink-0 text-hh-gold" aria-hidden />
              <a
                href={site.emailHref}
                className="break-all text-[15px] font-bold text-hh-cream hover:text-hh-gold"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
