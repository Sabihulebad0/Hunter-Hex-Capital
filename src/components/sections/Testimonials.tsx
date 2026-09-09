import Image from "next/image";
import { CheckCircle, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, trustPlatforms } from "@/data/testimonials";

/** Figma node 45:258. */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]"
    >
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          badge="Real Investor Experiences"
          title="Highly Recommended Across Key Platforms"
        />

        {/* testimonials-row (45:263) */}
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-6 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep p-8"
            >
              <div
                className="flex gap-1"
                role="img"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-hh-gold text-hh-gold"
                    aria-hidden
                  />
                ))}
              </div>

              <blockquote className="text-[16px] italic leading-[1.6] text-[var(--hh-dim)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="mt-auto flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-full object-cover"
                />
                <cite className="text-[15px] font-bold not-italic text-hh-cream sm:text-[16px]">
                  {item.author}
                </cite>
              </div>
            </li>
          ))}
        </ul>

        {/* platform-logos (45:312) */}
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-between lg:px-10">
          {trustPlatforms.map((platform) => (
            <li key={platform} className="flex items-center gap-2">
              <CheckCircle size={20} className="shrink-0 text-hh-gold" aria-hidden />
              <span className="text-[16px] font-bold text-[var(--hh-dim)] lg:text-[18px]">
                {platform}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
