import { Award, Star, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionHeading";
import { SpotPricePanel } from "@/components/sections/SpotPricePanel";

/** Trust row beneath the hero — Figma node 45:62. */
const badges = [
  { icon: Award, label: "BBB Accredited A+" },
  { icon: Star, label: "Trustpilot 4.9★" },
  { icon: TrendingUp, label: "Inc. 5000 Honoree" },
];

/** Figma node 45:19. */
export function Hero() {
  return (
    <section className="bg-hh-green py-14 lg:py-[80px]">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* hero-left (45:21) */}
          <div className="flex w-full min-w-0 flex-col items-start gap-8 lg:flex-1">
            <SectionBadge>Premier Wealth Protection</SectionBadge>

            <h1 className="text-[34px] font-bold leading-[1.1] text-hh-cream sm:text-[44px] lg:text-[56px]">
              Secure Your Family&apos;s Legacy With{" "}
              <span className="text-hh-gold">Physical Precious Metals</span>
            </h1>

            <p className="text-[16px] leading-[1.6] text-[var(--hh-dim)] lg:text-[18px]">
              Hunter Hex Capital specializes in placing physical gold, silver, and
              platinum directly into your hands or fully certified self-directed
              tax-advantaged IRAs.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Speak With a Specialist</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Request Investor Kit
              </ButtonLink>
            </div>
          </div>

          {/* hero-right (45:31) */}
          <div className="w-full lg:w-[480px] lg:shrink-0">
            <SpotPricePanel />
          </div>
        </div>

        {/* trust-badges (45:60) */}
        <div className="flex w-full flex-col items-center gap-4">
          <p className="text-center text-[13px] font-bold uppercase text-hh-gold-dark/50 lg:text-[14px]">
            Industry Accredited &amp; Highly Trusted
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-12">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-[8px] border border-[var(--hh-hairline)] bg-hh-deep p-3"
              >
                <Icon size={24} className="shrink-0 text-hh-gold" aria-hidden />
                <span className="text-[15px] font-bold text-hh-cream lg:text-[16px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
