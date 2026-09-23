import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { getProductImageAvailability } from "@/lib/product-images";

/** How many gold cards the Home page shows before routing out to the catalog. */
const GOLD_LIMIT = 8;

const goldProducts = products
  .filter((product) => product.metal === "gold")
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, GOLD_LIMIT);

/**
 * Dedicated gold showcase, directly beneath the hero's trust badges. The full
 * gold range lives on `/products?metal=gold`.
 */
export function GoldProducts() {
  const imageAvailability = getProductImageAvailability(goldProducts);

  return (
    <section
      id="gold"
      className="scroll-mt-[88px] border-y border-[var(--hh-hairline)] bg-hh-deep py-16 lg:py-[100px]"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            badge="Gold Collection"
            title={
              <>
                Physical <span className="text-hh-gold">Gold</span> Bullion
              </>
            }
          />
          <p className="max-w-[640px] text-[16px] leading-[1.6] text-[var(--hh-dim)]">
            Sovereign-minted coins, proofs and bars — the core of a wealth
            preservation strategy, delivered to your door or placed in a
            self-directed IRA.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goldProducts.map((product) => (
            <li key={product.slug} className="h-full">
              <ProductCard
                product={product}
                imageAvailable={imageAvailability[product.slug]}
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <ButtonLink href="/products?metal=gold">View All Gold Products</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
