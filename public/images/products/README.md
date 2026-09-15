# Product images

Licensed product photographs go in this folder, one per listing, and the card picks them up on the next deploy — no code change needed. Until a file exists, the card renders the on-brand SVG placeholder (`src/components/ui/ProductImagePlaceholder.tsx`).

## Spec

- Square, **1200 × 1200** px
- **`.webp`**
- Transparent or dark neutral background (the card ground is `#06150f`)
- No watermark, no third-party dealer branding
- Filename **exactly** as listed below — it is the product's `slug` in `src/data/products.ts`

Do not download or hotlink images from other dealers (A-Mark, APMEX, NUI, etc.). Their photographs belong to them.

## Expected files

39 of 44 photos were supplied by the client (Product_List.xlsx, Sep 2026) and processed to this spec — white studio background cut out, framed at 1200 × 1200. The five marked ⬜ still render the placeholder.

| # | File | Product | Status |
|---|---|---|---|
| 1 | `gold-american-eagle-coin.webp` | 1 oz Gold American Eagle Coin | ✅ in place |
| 2 | `gold-american-eagle-half-oz.webp` | 1/2 oz Gold American Eagle Coin | ✅ in place |
| 3 | `gold-american-eagle-quarter-oz.webp` | 1/4 oz Gold American Eagle Coin | ✅ in place |
| 4 | `gold-american-eagle-tenth-oz.webp` | 1/10 oz Gold American Eagle Coin | ✅ in place |
| 5 | `proof-gold-american-eagle-1-oz.webp` | 1 oz Proof Gold American Eagle (Box & Papers) | ✅ in place |
| 6 | `proof-gold-american-eagle-set-1-5-oz.webp` | 1.5 oz Proof Gold American Eagle Set | ✅ in place |
| 7 | `proof-gold-american-eagle-set-1-85-oz.webp` | 1.85 oz Proof Gold American Eagle 4-Coin Set | ✅ in place |
| 8 | `gold-american-buffalo-coin.webp` | 1 oz Gold American Buffalo Coin | ✅ in place |
| 9 | `gold-canadian-maple-leaf-coin.webp` | 1 oz Gold Canadian Maple Leaf Coin | ✅ in place |
| 10 | `gold-british-britannia-coin.webp` | 1 oz Gold British Britannia Coin | ✅ in place |
| 11 | `gold-south-african-krugerrand.webp` | 1 oz Gold South African Krugerrand | ✅ in place |
| 12 | `gold-austrian-philharmonic.webp` | 1 oz Gold Austrian Philharmonic | ✅ in place |
| 13 | `gold-australian-kangaroo.webp` | 1 oz Gold Australian Kangaroo Coin | ⬜ placeholder |
| 14 | `1-oz-gold-bullion-bar.webp` | 1 oz Gold Bar (Assorted Refiners) | ✅ in place |
| 15 | `10-oz-gold-bar.webp` | 10 oz Gold Bar (Assorted Refiners) | ✅ in place |
| 16 | `1-kilo-gold-bar.webp` | 1 kg Gold Bar | ⬜ placeholder |
| 17 | `silver-american-eagle-coin.webp` | 1 oz Silver American Eagle Coin | ✅ in place |
| 18 | `proof-silver-american-eagle.webp` | 1 oz Proof Silver American Eagle (Box & Papers) | ✅ in place |
| 19 | `silver-canadian-maple-leaf-coin.webp` | 1 oz Silver Canadian Maple Leaf Coin | ✅ in place |
| 20 | `silver-austrian-philharmonic.webp` | 1 oz Silver Austrian Philharmonic | ✅ in place |
| 21 | `silver-buffalo-round.webp` | 1 oz Silver Buffalo Round | ✅ in place |
| 22 | `1-oz-silver-round.webp` | 1 oz Silver Round (Assorted Mints) | ✅ in place |
| 23 | `tenth-oz-silver-round.webp` | 1/10 oz Silver Round | ⬜ placeholder |
| 24 | `1-oz-silver-bar.webp` | 1 oz Silver Bar | ✅ in place |
| 25 | `10-oz-silver-bar.webp` | 10 oz Silver Bar (Assorted Refiners) | ✅ in place |
| 26 | `100-oz-silver-bullion-bar.webp` | 100 oz Silver Bar | ✅ in place |
| 27 | `1-kilo-silver-bar.webp` | 1 kg Silver Bar | ⬜ placeholder |
| 28 | `90-silver-dimes-quarters.webp` | 90% U.S. Silver Dimes & Quarters | ✅ in place |
| 29 | `90-silver-half-dollars.webp` | 90% U.S. Silver Mixed Half Dollars | ✅ in place |
| 30 | `morgan-silver-dollar-pre-1921.webp` | Pre-1921 Morgan Silver Dollar | ✅ in place |
| 31 | `morgan-silver-dollar-1921.webp` | 1921 Morgan Silver Dollar | ✅ in place |
| 32 | `peace-silver-dollar.webp` | Peace Silver Dollar | ✅ in place |
| 33 | `platinum-american-eagle-coin.webp` | 1 oz Platinum American Eagle Coin | ✅ in place |
| 34 | `proof-platinum-american-eagle.webp` | 1 oz Proof Platinum American Eagle (Box & Papers) | ✅ in place |
| 35 | `proof-platinum-american-eagle-set-1-85-oz.webp` | 1.85 oz Proof Platinum American Eagle Set (Box & Papers) | ✅ in place |
| 36 | `platinum-canadian-maple-leaf.webp` | 1 oz Platinum Canadian Maple Leaf Coin | ✅ in place |
| 37 | `platinum-britannia-1-oz.webp` | 1 oz Platinum Britannia Coin | ✅ in place |
| 38 | `platinum-britannia-tenth-oz.webp` | 1/10 oz Platinum Britannia Coin | ✅ in place |
| 39 | `1-oz-platinum-bullion-bar.webp` | 1 oz Platinum Bar | ✅ in place |
| 40 | `platinum-1-gram-bar.webp` | 1 g Platinum Bar (In Assay) | ⬜ placeholder |
| 41 | `platinum-25-gram-combibar.webp` | 25 × 1 g Platinum Bar Sheet (0.80375 oz) | ✅ in place |
| 42 | `palladium-canadian-maple-leaf-coin.webp` | 1 oz Palladium Canadian Maple Leaf Coin | ✅ in place |
| 43 | `palladium-american-eagle.webp` | 1 oz Palladium American Eagle Coin | ✅ in place |
| 44 | `1-oz-palladium-bar.webp` | 1 oz Palladium Bar | ✅ in place |
