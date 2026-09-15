import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/data/services";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Precious metals sales, Gold and Silver IRA accounts, secure depositories and non-IRA storage plans from Hunter Hex Capital.",
  alternates: { canonical: "/services" },
};

/**
 * `/services` — the home page's Services grid (Figma 45:122) given its own
 * route, with the four-step engagement flow beneath it.
 *
 * The grid is rebuilt here rather than reusing `<Services />` because each card
 * needs to deep-link to its own anchor on this page. Card geometry, border and
 * type scale are unchanged from the approved design. Awaiting a Figma frame.
 */

/** Engagement flow — each step restates the approved service copy, nothing new. */
const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We map your position, timeline and whether physical delivery, an IRA or segregated storage fits what you are trying to protect.",
  },
  {
    number: "02",
    title: "Allocation & Quote",
    description:
      "You see the metals, the premium over spot and the spread in writing before anything is committed.",
  },
  {
    number: "03",
    title: "Funding or Rollover",
    description:
      "Cash purchase, or a seamless rollover from your traditional 401(k) into certified physical metals under trust custody.",
  },
  {
    number: "04",
    title: "Delivery or Custody",
    description:
      "Insured logistics to your door, or placement into off-site, fully-segregated non-bank vault space.",
  },
];

/** The three FAQ entries most often raised about the services themselves. */
const serviceFaqs = faqItems.filter((item) =>
  ["how-does-a-gold-ira-work", "how-is-my-gold-stored", "physical-delivery"].includes(
    item.id,
  ),
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Our Deployable Services"
        title="Institutional-Grade Solutions For"
        highlight="Wealth Storage"
        description="Four service lines covering acquisition, tax-advantaged retirement accounts and long-term custody — each run by the same desk, so nothing is handed off to a third party you never speak to."
        trail={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-hh-green py-16 lg:py-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(({ id, title, description, icon: Icon }) => (
              <li
                key={id}
                id={id}
                className="flex min-h-[280px] scroll-mt-[104px] flex-col gap-5 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-8"
              >
                <span className="inline-flex w-fit rounded-[8px] bg-hh-green p-3">
                  <Icon size={24} className="text-hh-gold" aria-hidden />
                </span>

                <div className="flex flex-col gap-2">
                  <h2 className="text-[20px] font-bold text-hh-cream">{title}</h2>
                  <p className="text-[14px] leading-[1.5] text-[var(--hh-dim)]">
                    {description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-hh-gold hover:underline"
                >
                  Speak to a Specialist
                  <ArrowRight size={14} aria-hidden />
                  <span className="sr-only">about {title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement flow */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionHeading
            badge="Engagement Process"
            title="From First Call to Vaulted Metal"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
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
        </Container>
      </section>

      {/* Service questions */}
      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <SectionHeading
            badge="Before You Commit"
            title="The Questions We Are Asked Most"
          />

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {serviceFaqs.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-[12px] border border-[var(--hh-hairline)] bg-hh-deep p-6"
              >
                <h3 className="text-[16px] font-bold text-hh-cream lg:text-[18px]">
                  {item.question}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[var(--hh-dim)]">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-hh-gold hover:underline"
            >
              Read all frequently answered questions
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Which Service Fits Your Position?"
        description="Tell us what you are protecting and over what horizon. We will tell you which of the four lines applies — including when the answer is none of them."
        secondary={{ label: "View Bullion Products", href: "/products" }}
      />
    </>
  );
}
