import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { site } from "@/data/site";

/**
 * Figma node 45:366.
 *
 * The phone and email here come from the client's live site, not from the Figma
 * contact block — that block holds designer placeholders (`00000000000`,
 * `vinesvcv@gmail.com`). See `src/data/site.ts`.
 */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <ContactForm />

          {/* contact-right (45:389) */}
          <div className="flex w-full flex-col gap-8 lg:w-[480px] lg:shrink-0">
            <div className="flex flex-col gap-4">
              <SectionBadge>Office Details</SectionBadge>

              <h2 className="text-[26px] font-bold text-hh-cream lg:text-[32px]">
                Hunter Hex Capital HQ
              </h2>

              <p className="text-[16px] leading-[1.6] text-[var(--hh-dim)]">
                Schedule a visit at our downtown Miami operations room for
                certified metal assaying and private storage planning.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
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

              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-hh-gold" aria-hidden />
                <address className="text-[16px] font-medium not-italic text-[var(--hh-dim)]">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </address>
              </li>
            </ul>

            <div className="relative h-[200px] w-full overflow-hidden rounded-[16px] border border-[var(--hh-hairline)]">
              <Image
                src="/images/map-hq.webp"
                alt={`Map showing ${site.name} at ${site.address.full}`}
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                className="object-cover"
              />
            </div>

            {/* free-guide-card (45:409) */}
            <div className="flex flex-col gap-4 rounded-[16px] border border-hh-gold-dark bg-hh-deep p-6">
              <h3 className="text-[18px] font-bold text-hh-gold lg:text-[20px]">
                Request Your Free Investment Guide
              </h3>
              <p className="text-[14px] text-[var(--hh-dim)]">
                Get our comprehensive physical metals 2026 handbook shipped
                discrete to your mailbox instantly.
              </p>

              <EmailCaptureForm
                source="investment-guide"
                label="Zip code"
                placeholder="Enter Your Zip Code"
                buttonLabel="Send"
                inputType="text"
                size="sm"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
