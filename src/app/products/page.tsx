import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";
import { TradingViewTickerTape } from "@/components/ui/TradingViewTickerTape";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bullion Products",
  description:
    "Investment-grade gold, silver, platinum and palladium bullion available through Hunter Hex Capital.",
  alternates: { canonical: "/products" },
};

/**
 * Destination for the home page's "View More Products" button, which the
 * client's direction note (Figma 45:461) asks to "lead to product page".
 *
 * No artboard exists for this route, so it is composed strictly from the
 * approved H1-R1 vocabulary — the same section badge, heading scale, spot bar
 * and product card. Nothing new is introduced. Awaiting a Figma frame.
 */
export default function ProductsPage() {
  return (
    <section className="bg-hh-green py-16 lg:py-[100px]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          badge="Asset Catalog"
          title="Investment-Grade Bullion Products"
        />

        <div className="flex flex-col items-start justify-between gap-3 rounded-[12px] border border-[var(--hh-hairline)] bg-hh-deep p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="shrink-0 text-hh-gold" aria-hidden />
            <span className="text-[14px] font-bold text-hh-gold">
              ACTIVE SPOT REFERENCE:
            </span>
          </div>

          <div className="w-full min-w-0 sm:flex-1">
            <TradingViewTickerTape />
          </div>
        </div>

        <ul className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <p className="text-center text-[13px] leading-[1.6] text-hh-muted">
          {site.marketDataNotice} Spot references are indicative and are not a
          quoted transaction price.
        </p>

        <div className="flex justify-center">
          <ButtonLink href="/#contact">Speak With a Specialist</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
