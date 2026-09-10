import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { faqItems } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How a Gold IRA works, minimum allocations, how metals are stored and insured, and whether you can take physical delivery — answered by Hunter Hex Capital.",
  alternates: { canonical: "/faq" },
};

/**
 * `/faq` — the home page's FAQ accordion (Figma 45:329) given its own route.
 *
 * The accordion itself is reused untouched. This page adds the `FAQPage`
 * structured data the standalone route earns, plus the direct-contact card.
 * Awaiting a Figma frame.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\u003c"),
        }}
      />

      <PageHero
        badge="Compliance & FAQs"
        title="The Answers Clients Want"
        highlight="Before They Commit"
        description="Custody, eligibility, minimums, insurance and delivery — the five things clients ask before they place a first allocation. If yours is not here, the desk will answer it directly."
        trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Faq />

      {/* Still have questions */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container>
          <div className="flex flex-col gap-6 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-8 lg:p-12">
            <h2 className="text-[24px] font-bold text-hh-gold lg:text-[28px]">
              Still Have a Question?
            </h2>

            <p className="max-w-[760px] text-[16px] leading-[1.6] text-[var(--hh-dim)]">
              Allocation minimums, IRA eligibility for a specific coin, or how
              segregation is verified at the depository — call the desk and you
              will speak to someone who can answer it on the first call.
            </p>

            <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-hh-gold" aria-hidden />
                <a
                  href={site.phoneHref}
                  className="text-[16px] font-bold text-hh-cream hover:text-hh-gold"
                >
                  {site.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-hh-gold" aria-hidden />
                <a
                  href={site.emailHref}
                  className="break-all text-[16px] font-bold text-hh-cream hover:text-hh-gold"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <p className="text-[12px] leading-[1.6] text-hh-muted">
              {site.disclaimer}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Get the Answer That Applies to Your Position"
        description="General answers only go so far. A short call gets you one that accounts for your account type, timeline and jurisdiction."
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
