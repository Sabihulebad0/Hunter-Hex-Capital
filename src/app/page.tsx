import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

/**
 * Home page — Figma artboard "Hunter Hex Capital LLC-H1-R1" (node 45:2).
 *
 * Section order is exactly the artboard's: header, hero, products, about,
 * services, gallery, testimonials, faq, contact, footer. Products sits third
 * per the client's direction note on the canvas (node 45:461).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
