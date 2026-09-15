import type { Metadata } from "next";
import { Suspense } from "react";
import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  ProductCatalog,
  ProductCatalogFallback,
} from "@/components/sections/ProductCatalog";
import { products } from "@/data/products";
import { getProductImageAvailability } from "@/lib/product-images";
import { TradingViewTickerTape } from "@/components/ui/TradingViewTickerTape";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bullion Products",
  description:
    "Coins, rounds and bars in gold, silver, platinum and palladium from Hunter Hex Capital. IRA eligibility is marked on each listing, and the spread you are quoted is the spread you pay.",
  alternates: { canonical: "/products" },
};

/**
 * `/products` — destination for the home page's "View More Products" button,
 * which the client's direction note (Figma 45:461) asks to "lead to product
 * page".
 *
 * No artboard exists for this route, so it is composed strictly from the
 * approved H1-R1 vocabulary — the same section badge, heading scale, spot bar
 * and product card. The filter sidebar (change request round 2) reuses the
 * `hh-deep` card, hairline and gold accent from that vocabulary.
 *
 * This file stays a server component so `metadata` works; the catalog itself
 * is a client component behind `<Suspense>`, which `useSearchParams` requires
 * on a prerendered route.
 */

export default function ProductsPage() {
  const imageAvailability = getProductImageAvailability(products);

  return (
    <>
      <PageHero
        badge="Asset Catalog"
        title="Investment-Grade"
        highlight="Bullion Products"
        description="Coins, rounds and bars in gold, silver, platinum and palladium. IRA eligibility is marked on each listing — request a quote and the spread you are shown is the spread you pay."
        trail={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

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

          {/*
            The fallback is the full catalog rendered on the server, so every
            listing is in the initial HTML; the filterable view takes over on
            hydration (see ProductCatalog).
          */}
          <Suspense
            fallback={
              <ProductCatalogFallback imageAvailability={imageAvailability} />
            }
          >
            <ProductCatalog imageAvailability={imageAvailability} />
          </Suspense>

          <p className="text-center text-[13px] leading-[1.6] text-hh-muted">
            {site.marketDataNotice} Spot references are indicative and are not a
            quoted transaction price.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Request a Quote on Any Listing Above"
        description="Tell us the metal, the quantity and whether it is going into an IRA or your own hands. We will come back with the premium in writing."
        secondary={{ label: "How Our Services Work", href: "/services" }}
      />
    </>
  );
}
