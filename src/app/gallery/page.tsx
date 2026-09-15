import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Visual documentation of Hunter Hex Capital's reserves, depository facilities, armed logistics and consulting rooms.",
  alternates: { canonical: "/gallery" },
};

/**
 * `/gallery` — the home page's Gallery section (Figma 45:234) given its own
 * route.
 *
 * The tiles are rebuilt rather than reusing `<Gallery />` so the first one can
 * run full-width as a lead image; the wash, radius, label chip and type scale
 * are unchanged from the approved design. Awaiting a Figma frame.
 */

const [lead, ...rest] = galleryItems;

export default function GalleryPage() {
  return (
    <>
      <PageHero
        badge="Facilities & Documentation"
        title="Transparency Through"
        highlight="Visual Documentation"
        description="Vaults, depositories, transport and the consulting room. We would rather show you where your metal sits than ask you to take it on trust."
        trail={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-hh-green py-16 lg:py-[100px]">
        <Container className="flex flex-col gap-6">
          {/* Lead tile — same treatment as the grid, at full column width. */}
          <figure className="relative flex h-[280px] flex-col justify-end overflow-hidden rounded-[16px] p-6 sm:h-[380px] lg:h-[440px]">
            <Image
              src={lead.image}
              alt={lead.alt}
              fill
              priority
              sizes="(max-width: 1439px) 100vw, 1280px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-hh-green/35" aria-hidden />

            <figcaption className="relative w-fit rounded-[6px] bg-hh-green/85 px-3 py-2 text-[14px] font-bold text-white">
              {lead.label}
            </figcaption>
          </figure>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <li
                key={item.id}
                className="relative flex h-[240px] flex-col justify-end overflow-hidden rounded-[16px] p-6 lg:h-[280px]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 384px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-hh-green/35" aria-hidden />

                <span className="relative w-fit rounded-[6px] bg-hh-green/85 px-3 py-2 text-[14px] font-bold text-white">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-hh-green pb-16 lg:pb-[100px]">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            badge="Site Visits"
            title="See the Operations Room in Person"
          />

          <p className="mx-auto max-w-[760px] text-center text-[16px] leading-[1.6] text-[var(--hh-dim)]">
            Photography can only carry so far. Clients placing a significant
            allocation are welcome at our downtown Miami operations room for
            certified metal assaying and private storage planning.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Book a Visit or Request the Facility Brief"
        description="We will walk you through the depository arrangement, the insurance position and how segregation is verified."
        secondary={{ label: "Read About Us", href: "/about" }}
      />
    </>
  );
}
