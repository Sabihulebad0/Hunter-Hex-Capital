import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/gallery";

/**
 * Figma node 45:234 — six 384x280 tiles, three-up, each with a 35% green wash
 * and a label chip pinned to the bottom-left.
 */
export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          badge="Portfolio & Facilities"
          title="Transparency Through Visual Documentation"
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
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
              <span
                className="absolute inset-0 bg-hh-green/35"
                aria-hidden
              />

              <span className="relative w-fit rounded-[6px] bg-hh-green/85 px-3 py-2 text-[14px] font-bold text-white">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
