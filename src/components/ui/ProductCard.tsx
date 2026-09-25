import Image from "next/image";
import Link from "next/link";
import {
  formatSpecLine,
  iraLabels,
  type Product,
} from "@/data/products";
import { ProductImagePlaceholder } from "@/components/ui/ProductImagePlaceholder";
import { cn } from "@/lib/utils";

/**
 * Figma node 45:195 — 280px card, 248x220 image well, name + spec,
 * then the IRA note beside a gold Quote button.
 *
 * `imageAvailable` comes from the server (`src/lib/product-images.ts`): the
 * placeholder renders until the product's photo is dropped into `public/`.
 */
export function ProductCard({
  product,
  imageAvailable,
}: {
  product: Product;
  imageAvailable: boolean;
}) {
  return (
    // `h-full` makes the card fill the grid row's height. Without it a card
    // whose name fits on one line renders shorter than a two-line neighbour
    // and its Quote button floats above the row's baseline.
    <article className="flex h-full flex-col gap-4 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep p-4">
      <div className="relative aspect-[248/220] w-full overflow-hidden rounded-[8px]">
        {imageAvailable ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <ProductImagePlaceholder
            metal={product.metal}
            type={product.type}
            weightLabel={product.weightLabel}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[18px] font-bold text-hh-cream">{product.name}</h3>
        <p className="text-[13px] leading-[1.5] text-[var(--hh-dim)]">
          {formatSpecLine(product)}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-[13px]",
            product.iraEligible === "no"
              ? "text-hh-muted/70"
              : "text-[var(--hh-dim)]",
          )}
        >
          {iraLabels[product.iraEligible]}
        </span>

        <Link
          // `#contact` targets the form section, which carries the scroll-mt
          // that clears the sticky header. Without it this lands on the top of
          // /contact, with the form well below the fold.
          href={`/contact?product=${product.slug}#contact`}
          className="shrink-0 rounded-[6px] bg-hh-gold px-3 py-2 text-[12px] font-bold text-hh-green transition-colors hover:bg-[#e3c88a]"
        >
          Quote
          <span className="sr-only"> for {product.name}</span>
        </Link>
      </div>
    </article>
  );
}
