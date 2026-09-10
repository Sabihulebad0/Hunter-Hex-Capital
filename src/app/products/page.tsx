import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { products, type MetalCategory } from "@/data/products";
import { TradingViewTickerTape } from "@/components/ui/TradingViewTickerTape";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bullion Products",
  description:
    "Investment-grade gold, silver, platinum and palladium bullion available through Hunter Hex Capital. Every listing is IRA eligible and quoted at a transparent premium over spot.",
  alternates: { canonical: "/products" },
};

/**
 * `/products` — destination for the home page's "View More Products" button,
 * which the client's direction note (Figma 45:461) asks to "lead to product
 * page".
 *
 * No artboard exists for this route, so it is composed strictly from the
 * approved H1-R1 vocabulary — the same section badge, heading scale, spot bar
 * and product card. Nothing new is introduced. Awaiting a Figma frame.
 */

/** Catalog order, so the grid always leads with gold. */
const categoryOrder: MetalCategory[] = ["gold", "silver", "platinum", "palladium"];

const categoryLabels: Record<MetalCategory, string> = {
  gold: "Gold",
  silver: "Silver",
  platinum: "Platinum",
  palladium: "Palladium",
};

const groups = categoryOrder
  .map((category) => ({
    category,
    label: categoryLabels[category],
    items: products.filter((product) => product.category === category),
  }))
  .filter((group) => group.items.length > 0);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        badge="Asset Catalog"
        title="Investment-Grade"
        highlight="Bullion Products"
        description="Coins, rounds and bars in gold, silver, platinum and palladium. Every listing below is IRA eligible and quoted at a stated premium over spot — request a quote and the spread you are shown is the spread you pay."
        trail={[{ label: "Home", href: "/" }, { label: "Products" }]}
      >
        <ul className="flex flex-wrap gap-3">
          {groups.map((group) => (
            <li key={group.category}>
              <a
                href={`#${group.category}`}
                className="inline-flex items-center gap-2 rounded-[100px] border border-[var(--hh-hairline)] bg-hh-green px-4 py-2 text-[14px] font-bold text-hh-cream transition-colors hover:border-hh-gold-dark hover:text-hh-gold"
              >
                {group.label}
                <span className="text-[13px] font-medium text-hh-muted">
                  {group.items.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-hh-green py-16 lg:py-[100px]">
        <Container className="flex flex-col gap-12">
          {/* spot-bar (45:188) */}
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

          {groups.map((group) => (
            <div
              key={group.category}
              id={group.category}
              className="flex scroll-mt-[104px] flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-[24px] font-bold text-hh-cream lg:text-[28px]">
                  {group.label}
                </h2>
                <span
                  className="h-px flex-1 bg-[var(--hh-hairline)]"
                  aria-hidden
                />
              </div>

              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((product) => (
                  <li key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="text-center text-[13px] leading-[1.6] text-hh-muted">
            {site.marketDataNotice} Spot references are indicative and are not a
            quoted transaction price.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Request a Quote on Any Listing Above"
        description="Tell us the metal, the quantity and whether it is going into an IRA, a trust or your own hands. We will come back with the premium in writing."
        secondary={{ label: "How Our Services Work", href: "/services" }}
      />
    </>
  );
}
