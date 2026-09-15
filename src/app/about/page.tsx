import type { Metadata } from "next";
import { Award, Eye, Lock, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { About } from "@/components/sections/About";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hunter Hex Capital is a boutique physical metals brokerage and custody coordinator serving private collectors, wealth managers and family offices from downtown Miami.",
  alternates: { canonical: "/about" },
};

/**
 * `/about` — the home page's About section (Figma 45:75) given its own route.
 *
 * No artboard exists for the inner pages, so everything below the reused
 * section is composed strictly from the approved H1-R1 vocabulary: the gold
 * badge, the 40px heading scale, and the `hh-deep` card with a gold border.
 * Copy asserts nothing the approved design or the live site does not already
 * claim. Awaiting a Figma frame.
 */

/** Principles — each restates a claim already made in the approved design. */
const principles = [
  {
    icon: Eye,
    title: "Transparent Pricing",
    description:
      "Premiums over spot are quoted plainly before you commit, and the spread you are shown is the spread you pay.",
  },
  {
    icon: Lock,
    title: "Fully Segregated Custody",
    description:
      "Off-site, fully-segregated storage across sovereign, non-bank secure vault spaces — never commingled with another client's holding.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Insured",
    description:
      "We operate out of institutional-grade storage environments, so every asset is accounted for, fully insured and completely verified.",
  },
  {
    icon: TrendingUp,
    title: "Consulting, Not Sales Pressure",
    description:
      "Fifteen years of strategic consulting behind every allocation conversation, whether you are placing your first ounce or restructuring a trust.",
  },
];

/** Accreditations — the same three carried by the home hero (Figma 45:62). */
const accreditations = [
  { icon: Award, label: "BBB Accredited A+" },
  { icon: Star, label: "Trustpilot 4.9★" },
  { icon: TrendingUp, label: "Inc. 5000 Honoree" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Who We Are"
        title="A Boutique Metals Desk Built Around"
        highlight="Wealth Continuity"
        description="Hunter Hex Capital LLC offers boutique physical metals brokerage and custody coordination. Our focus is ensuring wealth continuity for prospective generations — for individual collectors, wealth managers and family offices alike."
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <About />

      {/* How we operate */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="How We Operate"
            title="The Principles Behind Every Allocation"
          />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex flex-col gap-5 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-8"
              >
                <span className="inline-flex w-fit rounded-[8px] bg-hh-green p-3">
                  <Icon size={24} className="text-hh-gold" aria-hidden />
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[20px] font-bold text-hh-cream">{title}</h3>
                  <p className="text-[14px] leading-[1.5] text-[var(--hh-dim)]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Accreditations + HQ */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
            <SectionHeading
              badge="Industry Standing"
              align="left"
              title="Accredited, Reviewed and Independently Verified"
            />

            <p className="text-[16px] leading-[1.6] text-[var(--hh-dim)]">
              Our institutional relationships, deep market knowledge and
              transparent logistics pipeline mean we offer unmatched service for
              individual collectors and wealth managers alike.
            </p>

            <ul className="flex flex-wrap items-center gap-4">
              {accreditations.map(({ icon: Icon, label }) => (
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

          <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep p-8 lg:w-[480px] lg:shrink-0">
            <h3 className="text-[20px] font-bold text-hh-gold">
              {site.name} HQ
            </h3>

            <address className="text-[16px] font-medium not-italic leading-[1.6] text-[var(--hh-dim)]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>

            <p className="text-[14px] leading-[1.6] text-[var(--hh-dim)]">
              Schedule a visit at our downtown Miami operations room for
              certified metal assaying and private storage planning.
            </p>

            <p className="mt-2 text-[12px] leading-[1.6] text-hh-muted">
              {site.disclaimer}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's Talk About Where Your Metals Should Sit"
        secondary={{ label: "Browse the Catalog", href: "/products" }}
      />
    </>
  );
}
