import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { frameworks, mandates, reviewSteps } from "@/data/portfolio";
import { categoryLabels } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "How Hunter Hex Capital structures a physical metals allocation — four illustrative frameworks, representative mandates, and what a portfolio review covers.",
  alternates: { canonical: "/portfolio" },
};

/**
 * `/portfolio` — how an allocation is *structured*.
 *
 * No Figma artboard exists for this route, so like the other inner pages it is
 * composed strictly from the approved H1-R1 vocabulary: the gold section badge,
 * the `hh-deep` card on a gold hairline, the numbered step card from /services
 * and the closing CTA band. Nothing new is introduced. Awaiting a Figma frame.
 *
 * On content: the footer disclosure states the desk gives no investment advice,
 * so this page shows shape and process only — no returns, no performance, no
 * figures against a client. See the header comment in `src/data/portfolio.ts`
 * before adding anything here.
 */

/**
 * Each metal gets a fixed step on the gold ramp so a reader can match a band to
 * its label across all four charts. The palette carries one accent, so the
 * bands are separated by weight rather than by hue.
 */
const metalFill: Record<string, string> = {
  gold: "var(--color-hh-gold)",
  silver: "rgba(217, 184, 114, 0.62)",
  platinum: "rgba(217, 184, 114, 0.38)",
  palladium: "rgba(217, 184, 114, 0.2)",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        badge="Allocation Portfolio"
        title="How a Physical Allocation Is"
        highlight="Actually Built"
        description="Four structures the desk is asked to build most often, the shape of a real mandate, and the review that gets you from a starting position to metal in a vault. Structure and process only — the figures that matter are the premiums, and you see those in writing."
        trail={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      >
        <ul className="flex flex-wrap gap-3">
          {frameworks.map((framework) => (
            <li key={framework.id}>
              <a
                href={`#${framework.id}`}
                className="inline-flex items-center gap-2 rounded-[100px] border border-[var(--hh-hairline)] bg-hh-green px-4 py-2 text-[14px] font-bold text-hh-cream transition-colors hover:border-hh-gold-dark hover:text-hh-gold"
              >
                {framework.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Allocation frameworks */}
      <section className="bg-hh-green py-16 lg:py-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="Allocation Frameworks"
            title="Four Ways Clients Structure a Sleeve"
          />

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {frameworks.map(
              ({ id, name, icon: Icon, objective, horizon, vehicle, custody, mix }) => (
                <li
                  key={id}
                  id={id}
                  className="flex scroll-mt-[104px] flex-col gap-6 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-6 lg:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex shrink-0 rounded-[8px] bg-hh-green p-3">
                      <Icon size={24} className="text-hh-gold" aria-hidden />
                    </span>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-[20px] font-bold text-hh-cream">{name}</h3>
                      <p className="text-[14px] leading-[1.6] text-[var(--hh-dim)]">
                        {objective}
                      </p>
                    </div>
                  </div>

                  {/*
                    Mix — a stacked band plus its own legend, so the split stays
                    readable without relying on colour alone.
                  */}
                  <div className="flex flex-col gap-3">
                    <div
                      role="img"
                      aria-label={`Mix: ${mix
                        .map((slice) => `${slice.share}% ${categoryLabels[slice.metal]}`)
                        .join(", ")}`}
                      className="flex h-3 w-full overflow-hidden rounded-[100px] bg-hh-green"
                    >
                      {mix.map((slice) => (
                        <span
                          key={slice.metal}
                          style={{
                            width: `${slice.share}%`,
                            backgroundColor: metalFill[slice.metal],
                          }}
                        />
                      ))}
                    </div>

                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {mix.map((slice) => (
                        <li
                          key={slice.metal}
                          className="flex items-center gap-2 text-[13px] text-[var(--hh-dim)]"
                        >
                          <span
                            aria-hidden
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: metalFill[slice.metal] }}
                          />
                          <span className="font-bold text-hh-cream">
                            {slice.share}%
                          </span>
                          {categoryLabels[slice.metal]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="mt-auto grid grid-cols-1 gap-x-6 gap-y-4 border-t border-[var(--hh-hairline)] pt-5 sm:grid-cols-3">
                    {[
                      { term: "Horizon", detail: horizon },
                      { term: "Vehicle", detail: vehicle },
                      { term: "Custody", detail: custody },
                    ].map(({ term, detail }) => (
                      <div key={term} className="flex flex-col gap-1">
                        <dt className="text-[12px] font-bold uppercase tracking-wide text-hh-gold">
                          {term}
                        </dt>
                        <dd className="text-[14px] leading-[1.5] text-hh-cream">
                          {detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ),
            )}
          </ul>

          {/*
            The frameworks describe structure, not a recommendation. Say so on
            the page rather than leaning on the footer disclosure alone.
          */}
          <p className="mx-auto flex max-w-[860px] items-start gap-3 rounded-[12px] border border-[var(--hh-hairline)] bg-hh-deep p-5 text-[13px] leading-[1.6] text-hh-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-hh-gold" aria-hidden />
            <span>
              These frameworks illustrate how a metals sleeve can be composed.
              They are not recommendations, and not a forecast of any result.{" "}
              {site.disclaimer}
            </span>
          </p>
        </Container>
      </section>

      {/* Representative mandates */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="Representative Mandates"
            title="What an Engagement Looks Like"
          />

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {mandates.map(({ id, profile, situation, structure, outcome }) => (
              <li
                key={id}
                className="flex flex-col gap-5 rounded-[16px] border-t-4 border-hh-gold-dark bg-hh-deep p-6 lg:p-8"
              >
                <h3 className="text-[18px] font-bold text-hh-cream">{profile}</h3>

                <dl className="flex flex-col gap-4">
                  {[
                    { term: "The position", detail: situation },
                    { term: "How it was structured", detail: structure },
                    { term: "Where it sits now", detail: outcome },
                  ].map(({ term, detail }) => (
                    <div key={term} className="flex flex-col gap-1">
                      <dt className="text-[12px] font-bold uppercase tracking-wide text-hh-gold">
                        {term}
                      </dt>
                      <dd className="text-[14px] leading-[1.6] text-[var(--hh-dim)]">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          <p className="mx-auto max-w-[760px] text-center text-[13px] leading-[1.6] text-hh-muted">
            Composite profiles, drawn from the kinds of mandate the desk runs.
            They describe structure and custody only — no client, and no figures.
          </p>
        </Container>
      </section>

      {/* Portfolio review */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="Portfolio Review"
            title="From Starting Position to Vaulted Metal"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviewSteps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col gap-4 rounded-[16px] border-t-4 border-hh-gold-dark bg-hh-deep p-6"
              >
                <span className="text-[32px] font-bold leading-none text-hh-gold">
                  {step.number}
                </span>
                <h3 className="text-[18px] font-bold text-hh-cream">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.5] text-[var(--hh-dim)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-hh-gold hover:underline"
            >
              See the bullion these frameworks are built from
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a Position You Want Structured?"
        description="Bring us what you hold and what you are protecting. We will show you which framework fits, which vehicle it belongs in, and the premium on every line before you commit to anything."
        secondary={{ label: "How Our Services Work", href: "/services" }}
      />
    </>
  );
}
