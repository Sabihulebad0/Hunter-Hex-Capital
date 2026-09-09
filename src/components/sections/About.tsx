import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Stat cards — Figma nodes 45:84 / 45:87 / 45:90. */
const stats = [
  { value: "$4B+", label: "Physical Metals Safely Delivered" },
  { value: "12,000+", label: "Private & Institutional Clients" },
  { value: "15+ Years", label: "Providing Strategic Advisory" },
];

/** Figma node 45:75. */
export function About() {
  return (
    <section id="about" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* about-left (45:77) */}
          <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
            <SectionHeading
              badge="About Us"
              align="left"
              title="Preserving Wealth with Precision, Transparency, and Security"
            />

            <p className="text-[16px] leading-[1.6] text-[var(--hh-dim)]">
              At Hunter Hex Capital, we are dedicated to helping our clients
              navigate uncertain economic climates. Our institutional
              relationships, deep market knowledge, and transparent logistics
              pipeline mean we offer unmatched service for individual collectors
              and wealth managers alike.
            </p>

            <p className="text-[16px] leading-[1.6] text-[var(--hh-dim)]">
              We operate out of institutional-grade storage environments, ensuring
              that every asset is accounted for, fully insured, and completely
              verified.
            </p>
          </div>

          {/* about-right (45:83) */}
          <ul className="flex w-full flex-col gap-4 lg:w-[480px] lg:shrink-0">
            {stats.map((stat) => (
              <li
                key={stat.value}
                className="flex items-center gap-5 rounded-[16px] border-l-4 border-hh-gold-dark bg-hh-deep p-6"
              >
                <span className="shrink-0 text-[26px] font-bold text-hh-gold sm:text-[32px]">
                  {stat.value}
                </span>
                <span className="text-[15px] font-medium text-hh-cream sm:text-[16px]">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
