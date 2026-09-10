import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

/**
 * Figma node 45:195 — 280px card, 248x220 image well, name + spread, then an
 * "IRA Eligible" note beside a gold Quote button.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col gap-4 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep p-4">
      <div className="relative aspect-[248/220] w-full overflow-hidden rounded-[8px]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[18px] font-bold text-hh-cream">{product.name}</h3>
        <p className="text-[14px] font-bold text-hh-gold">{product.spread}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        {product.iraEligible && (
          <span className="text-[13px] text-[var(--hh-dim)]">IRA Eligible</span>
        )}

        <Link
          // `#contact` targets the form section, which carries the scroll-mt
          // that clears the sticky header. Without it this lands on the top of
          // /contact, with the form well below the fold.
          href={`/contact?product=${product.id}#contact`}
          className="rounded-[6px] bg-hh-gold px-3 py-2 text-[12px] font-bold text-hh-green transition-colors hover:bg-[#e3c88a]"
        >
          Quote
          <span className="sr-only"> for {product.name}</span>
        </Link>
      </div>
    </article>
  );
}
