import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a Hunter Hex Capital investment specialist about physical metals, Gold and Silver IRAs, delivery and segregated storage. Miami, FL.",
  alternates: { canonical: "/contact" },
};

/**
 * `/contact` — the home page's Contact section (Figma 45:366) given its own
 * route, with the direct-contact strip above the form.
 *
 * Phone, email and address come from `src/data/site.ts` (the client's live
 * site), never from the Figma contact block's designer placeholders.
 * Awaiting a Figma frame.
 */

/**
 * TODO(client): opening hours are not stated on the live site or in Figma. The
 * wording below commits to no specific times — replace it once the client
 * confirms the desk's hours.
 */
const channels = [
  {
    icon: Phone,
    label: "Call the Desk",
    value: site.phone,
    href: site.phoneHref,
    note: "Fastest route to a specialist.",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: site.email,
    href: site.emailHref,
    note: "Quotes, paperwork and rollover questions.",
  },
  {
    icon: MapPin,
    label: "Visit the Office",
    value: site.address.full,
    note: "Downtown Miami operations room, by appointment.",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Same business day",
    note: "Every enquiry is answered by a person, not a queue.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Speak With Us"
        title="Talk to an"
        highlight="Investment Specialist"
        description="Tell us what you are protecting and over what horizon. We will walk you through allocation, IRA eligibility, delivery and segregated storage — with no obligation to place anything."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-hh-green pt-16 lg:pt-[100px]">
        <Container>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href, note }) => (
              <li
                key={label}
                className="flex flex-col gap-3 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep p-6"
              >
                <span className="inline-flex w-fit rounded-[8px] bg-hh-green p-3">
                  <Icon size={22} className="text-hh-gold" aria-hidden />
                </span>

                <h2 className="text-[16px] font-bold text-hh-gold">{label}</h2>

                {href ? (
                  <a
                    href={href}
                    className="break-words text-[16px] font-bold text-hh-cream hover:text-hh-gold"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-[16px] font-bold text-hh-cream">{value}</p>
                )}

                <p className="mt-auto text-[13px] leading-[1.5] text-[var(--hh-dim)]">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Contact />
    </>
  );
}
