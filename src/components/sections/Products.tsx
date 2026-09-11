import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { featuredProducts } from "@/data/products";
import { TradingViewTickerTape } from "@/components/ui/TradingViewTickerTape";

/**
 * Figma node 45:183.
 *
 * The client's brief moved this section to third in the page order and grew it
 * from four products to eight with a "View More Products" route out.
 */
export function Products() {
  return (
    <section id="products" className="scroll-mt-[88px] bg-hh-green py-16 lg:py-[100px]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          badge="Asset Catalog"
          title="Investment-Grade Bullion Products"
        />

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

        {/* product-grid (45:194) */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        {/* view-all-wrap (45:231) */}
        <div className="flex justify-center">
          <ButtonLink href="/products">View More Products</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
