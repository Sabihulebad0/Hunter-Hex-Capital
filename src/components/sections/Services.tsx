import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

/**
 * Figma node 45:122 — five 360x280 cards wrapping three-up inside the 1280
 * column, so the last row holds two.
 */
export function Services() {
  return (
    <section id="services" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          badge="Our Deployable Services"
          title="Institutional-Grade Solutions For Wealth Storage"
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, description, icon: Icon }) => (
            <li
              key={id}
              className="flex min-h-[280px] flex-col gap-5 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-8"
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

              <Link
                href={`/services#${id}`}
                className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-hh-gold hover:underline"
              >
                Learn More
                <ArrowRight size={14} aria-hidden />
                <span className="sr-only">about {title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
