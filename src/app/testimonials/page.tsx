import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What retired engineers, estate attorneys and family offices say about working with Hunter Hex Capital on IRA transitions, trust assets and bullion delivery.",
  alternates: { canonical: "/testimonials" },
};

/**
 * `/testimonials` — the home page's Testimonials section (Figma 45:258) given
 * its own route, framed by the client-type breakdown.
 *
 * The stats below are the same three figures already carried by the approved
 * About section (Figma 45:84/87/90) — no new claims are made. Awaiting a Figma
 * frame.
 */

const stats = [
  { value: "$4B+", label: "Physical Metals Safely Delivered" },
  { value: "12,000+", label: "Private & Institutional Clients" },
  { value: "15+ Years", label: "Providing Strategic Consulting" },
];

/** Client types, drawn from the three approved testimonials themselves. */
const clientTypes = [
  {
    title: "Private Investors",
    description:
      "Retirees and individual collectors moving part of a portfolio into metal they can hold, or into a self-directed IRA.",
  },
  {
    title: "Estate & Trust Counsel",
    description:
      "Attorneys placing trust assets where the custody arrangement and the paper trail both hold up to review.",
  },
  {
    title: "Family Offices",
    description:
      "Multi-generational mandates that need locked pricing spreads, secured delivery and a single point of contact.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        badge="Real Investor Experiences"
        title="Verified Reviews From"
        highlight="Real Investors"
        description="Reviews from the people who actually moved metal with us — a retired engineer, an estate attorney and a family office principal. Verified across Google, BBB, Trustpilot and Consumer Affairs."
        trail={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      />

      <section className="bg-hh-green pt-16 lg:pt-[100px]">
        <Container>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <li
                key={stat.value}
                className="flex flex-col gap-2 rounded-[16px] border-l-4 border-hh-gold-dark bg-hh-deep p-6"
              >
                <span className="text-[28px] font-bold text-hh-gold sm:text-[32px]">
                  {stat.value}
                </span>
                <span className="text-[15px] font-medium text-hh-cream sm:text-[16px]">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Testimonials />

      {/* Who we work with */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="Who We Work With"
            title="Three Very Different Mandates, One Desk"
          />

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {clientTypes.map((type) => (
              <li
                key={type.title}
                className="flex flex-col gap-3 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-8"
              >
                <CheckCircle size={24} className="text-hh-gold" aria-hidden />
                <h3 className="text-[20px] font-bold text-hh-cream">
                  {type.title}
                </h3>
                <p className="text-[14px] leading-[1.5] text-[var(--hh-dim)]">
                  {type.description}
                </p>
              </li>
            ))}
          </ul>

          <p className="mx-auto max-w-[900px] text-center text-[12px] leading-[1.6] text-hh-muted">
            {site.disclaimer} Testimonials reflect the experience of individual
            clients and are not a guarantee of future results.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Add Your Own Experience to the List"
        description="Start with a discovery call. No obligation, and no pressure to place an allocation on the first conversation."
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
