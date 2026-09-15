import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import type { Product } from "@/data/products";

/**
 * Whether a product's photograph exists under `public/`.
 *
 * Licensed photos are dropped into `public/images/products/<slug>.webp` later
 * (see the README there). Until a file lands, the card renders the on-brand
 * `ProductImagePlaceholder` instead of a broken `<Image>`. Checking the disk at
 * render time — this only ever runs on the server, at build — means adding a
 * photo needs no code change, just a redeploy.
 */
export function hasProductImage(product: Product): boolean {
  return existsSync(path.join(process.cwd(), "public", product.image));
}

/** `slug → true` for every product whose photo is on disk. */
export function getProductImageAvailability(
  products: Product[],
): Record<string, boolean> {
  return Object.fromEntries(
    products.map((product) => [product.slug, hasProductImage(product)]),
  );
}
