export type Metal = "gold" | "silver" | "platinum" | "palladium";
export type ProductType = "coin" | "bar" | "round" | "proof" | "historic";
export type IraStatus = "yes" | "no" | "confirm";

export type Denomination = {
  /** 50, 1.5, 0.10 */
  value: number;
  currency: "USD" | "CAD" | "GBP" | "EUR" | "AUD";
  /** "$50", "CA$50", "£100", "€1.50", "AU$100", "25¢" */
  label: string;
};

export type Product = {
  slug: string;
  /** Old slugs that must still resolve on `/contact?product=<slug>`. */
  legacySlugs?: string[];
  name: string;
  metal: Metal;
  type: ProductType;
  /** "1 oz", "1/10 oz", "1 kg", "25 g", "Sold by face value" */
  weightLabel: string;
  /** Canonical weight; null = not filterable by weight. */
  weightGrams: number | null;
  /** ".9999" */
  purity: string;
  /** Empty for bars, rounds and the Krugerrand — nothing carries a face value. */
  denominations: Denomination[];
  /** Official mint spec where known; null = unknown, never guessed. */
  thicknessMm: number | null;
  iraEligible: IraStatus;
  /** Premium over spot in percent; null renders "Premium on request". */
  spreadPct: number | null;
  /** `/images/products/<slug>.webp` — the placeholder renders until it exists. */
  image: string;
  imageAlt: string;
  /** Shown on the Home page. */
  featured?: boolean;
  sortOrder: number;
};

export const TROY_OUNCE_GRAMS = 31.1035;
export const KILOGRAM_TROY_OUNCES = 32.1507;

const usd = (value: number, label: string): Denomination => ({
  value,
  currency: "USD",
  label,
});
const cad = (value: number, label: string): Denomination => ({
  value,
  currency: "CAD",
  label,
});
const gbp = (value: number, label: string): Denomination => ({
  value,
  currency: "GBP",
  label,
});
const eur = (value: number, label: string): Denomination => ({
  value,
  currency: "EUR",
  label,
});
const aud = (value: number, label: string): Denomination => ({
  value,
  currency: "AUD",
  label,
});

/**
 * The full catalog — change request round 2, §3.4. Grams use 31.1035 g/oz;
 * thickness values are official mint specs where known and `null` otherwise.
 *
 * The eight products with a `spreadPct` are the original Figma cards (node
 * 45:194) and keep the spreads written in the design. Every other listing
 * quotes "Premium on request" until the client supplies a figure — do not
 * invent one.
 *
 * Every entry is written out by hand rather than generated, so a listing can be
 * read, checked and corrected line by line against the client's sheet.
 */
export const products: Product[] = [
  // ── Gold ────────────────────────────────────────────────────────────────
  {
    slug: "gold-american-eagle-coin",
    name: "1 oz Gold American Eagle Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9167",
    denominations: [usd(50, "$50")],
    thicknessMm: 2.87,
    iraEligible: "yes",
    spreadPct: 2.4,
    image: "/images/products/gold-american-eagle-coin.webp",
    imageAlt: "Gold American Eagle coin showing the Saint-Gaudens Liberty obverse",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "gold-american-eagle-half-oz",
    name: "1/2 oz Gold American Eagle Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1/2 oz",
    weightGrams: 15.5517,
    purity: ".9167",
    denominations: [usd(25, "$25")],
    thicknessMm: 2.15,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-american-eagle-half-oz.webp",
    imageAlt: "Half troy ounce Gold American Eagle coin",
    sortOrder: 2,
  },
  {
    slug: "gold-american-eagle-quarter-oz",
    name: "1/4 oz Gold American Eagle Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1/4 oz",
    weightGrams: 7.7759,
    purity: ".9167",
    denominations: [usd(10, "$10")],
    thicknessMm: 1.78,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-american-eagle-quarter-oz.webp",
    imageAlt: "Quarter troy ounce Gold American Eagle coin",
    sortOrder: 3,
  },
  {
    slug: "gold-american-eagle-tenth-oz",
    name: "1/10 oz Gold American Eagle Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1/10 oz",
    weightGrams: 3.1104,
    purity: ".9167",
    denominations: [usd(5, "$5")],
    thicknessMm: 1.19,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-american-eagle-tenth-oz.webp",
    imageAlt: "Tenth troy ounce Gold American Eagle coin",
    sortOrder: 4,
  },
  {
    slug: "proof-gold-american-eagle-1-oz",
    name: "1 oz Proof Gold American Eagle (Box & Papers)",
    metal: "gold",
    type: "proof",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9167",
    denominations: [usd(50, "$50")],
    thicknessMm: 2.87,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-gold-american-eagle-1-oz.webp",
    imageAlt:
      "One troy ounce Proof Gold American Eagle coin with its presentation box and certificate",
    sortOrder: 5,
  },
  {
    slug: "proof-gold-american-eagle-set-1-5-oz",
    name: "1.5 oz Proof Gold American Eagle Set",
    metal: "gold",
    type: "proof",
    weightLabel: "1.5 oz",
    weightGrams: 46.6553,
    purity: ".9167",
    // TODO(client): the coins that make up this set are not yet confirmed, so
    // no face values are listed. Fill in once the composition is approved.
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-gold-american-eagle-set-1-5-oz.webp",
    imageAlt: "Proof Gold American Eagle coin set totalling 1.5 troy ounces",
    sortOrder: 6,
  },
  {
    slug: "proof-gold-american-eagle-set-1-85-oz",
    name: "1.85 oz Proof Gold American Eagle 4-Coin Set",
    metal: "gold",
    type: "proof",
    weightLabel: "1.85 oz",
    weightGrams: 57.5415,
    purity: ".9167",
    denominations: [
      usd(50, "$50"),
      usd(25, "$25"),
      usd(10, "$10"),
      usd(5, "$5"),
    ],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-gold-american-eagle-set-1-85-oz.webp",
    imageAlt:
      "Four-coin Proof Gold American Eagle set totalling 1.85 troy ounces",
    sortOrder: 7,
  },
  {
    slug: "gold-american-buffalo-coin",
    name: "1 oz Gold American Buffalo Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [usd(50, "$50")],
    thicknessMm: 2.95,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-american-buffalo-coin.webp",
    imageAlt: "One troy ounce Gold American Buffalo coin",
    sortOrder: 8,
  },
  {
    slug: "gold-canadian-maple-leaf-coin",
    name: "1 oz Gold Canadian Maple Leaf Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [cad(50, "CA$50")],
    thicknessMm: 2.8,
    iraEligible: "yes",
    spreadPct: 2.2,
    image: "/images/products/gold-canadian-maple-leaf-coin.webp",
    imageAlt: "One troy ounce Gold Canadian Maple Leaf bullion coin",
    featured: true,
    sortOrder: 9,
  },
  {
    slug: "gold-british-britannia-coin",
    name: "1 oz Gold British Britannia Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [gbp(100, "£100")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-british-britannia-coin.webp",
    imageAlt: "One troy ounce Gold British Britannia coin",
    sortOrder: 10,
  },
  {
    slug: "gold-south-african-krugerrand",
    name: "1 oz Gold South African Krugerrand",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9167",
    denominations: [],
    thicknessMm: 2.84,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/gold-south-african-krugerrand.webp",
    imageAlt: "One troy ounce Gold South African Krugerrand coin",
    sortOrder: 11,
  },
  {
    slug: "gold-austrian-philharmonic",
    name: "1 oz Gold Austrian Philharmonic",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [eur(100, "€100")],
    thicknessMm: 2,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-austrian-philharmonic.webp",
    imageAlt: "One troy ounce Gold Austrian Philharmonic coin",
    sortOrder: 12,
  },
  {
    slug: "gold-australian-kangaroo",
    name: "1 oz Gold Australian Kangaroo Coin",
    metal: "gold",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [aud(100, "AU$100")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/gold-australian-kangaroo.webp",
    imageAlt: "One troy ounce Gold Australian Kangaroo coin",
    sortOrder: 13,
  },
  {
    slug: "1-oz-gold-bullion-bar",
    name: "1 oz Gold Bar (Assorted Refiners)",
    metal: "gold",
    type: "bar",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: 1.8,
    image: "/images/products/1-oz-gold-bullion-bar.webp",
    imageAlt: "One troy ounce gold bar from an assorted LBMA-accredited refiner",
    featured: true,
    sortOrder: 14,
  },
  {
    slug: "10-oz-gold-bar",
    name: "10 oz Gold Bar (Assorted Refiners)",
    metal: "gold",
    type: "bar",
    weightLabel: "10 oz",
    weightGrams: 311.035,
    purity: ".9999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/10-oz-gold-bar.webp",
    imageAlt: "Ten troy ounce gold bar from an assorted LBMA-accredited refiner",
    sortOrder: 15,
  },
  {
    slug: "1-kilo-gold-bar",
    name: "1 kg Gold Bar",
    metal: "gold",
    type: "bar",
    weightLabel: "1 kg",
    weightGrams: 1000,
    purity: ".9999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/1-kilo-gold-bar.webp",
    imageAlt: "One kilogram gold bar",
    sortOrder: 16,
  },

  // ── Silver ──────────────────────────────────────────────────────────────
  {
    slug: "silver-american-eagle-coin",
    name: "1 oz Silver American Eagle Coin",
    metal: "silver",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [usd(1, "$1")],
    thicknessMm: 2.98,
    iraEligible: "yes",
    spreadPct: 4.1,
    image: "/images/products/silver-american-eagle-coin.webp",
    imageAlt: "Silver American Eagle coin showing the Walking Liberty obverse",
    featured: true,
    sortOrder: 17,
  },
  {
    slug: "proof-silver-american-eagle",
    name: "1 oz Proof Silver American Eagle (Box & Papers)",
    metal: "silver",
    type: "proof",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [usd(1, "$1")],
    thicknessMm: 2.98,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-silver-american-eagle.webp",
    imageAlt:
      "One troy ounce Proof Silver American Eagle coin with its presentation box and certificate",
    sortOrder: 18,
  },
  {
    slug: "silver-canadian-maple-leaf-coin",
    name: "1 oz Silver Canadian Maple Leaf Coin",
    metal: "silver",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9999",
    denominations: [cad(5, "CA$5")],
    thicknessMm: 3.29,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/silver-canadian-maple-leaf-coin.webp",
    imageAlt: "One troy ounce Silver Canadian Maple Leaf coin",
    sortOrder: 19,
  },
  {
    slug: "silver-austrian-philharmonic",
    name: "1 oz Silver Austrian Philharmonic",
    metal: "silver",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [eur(1.5, "€1.50")],
    thicknessMm: 3.2,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/silver-austrian-philharmonic.webp",
    imageAlt: "One troy ounce Silver Austrian Philharmonic coin",
    sortOrder: 20,
  },
  {
    slug: "silver-buffalo-round",
    name: "1 oz Silver Buffalo Round",
    metal: "silver",
    type: "round",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "confirm",
    spreadPct: null,
    image: "/images/products/silver-buffalo-round.webp",
    imageAlt: "One troy ounce silver round with the Buffalo design",
    sortOrder: 21,
  },
  {
    slug: "1-oz-silver-round",
    name: "1 oz Silver Round (Assorted Mints)",
    metal: "silver",
    type: "round",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "confirm",
    spreadPct: null,
    image: "/images/products/1-oz-silver-round.webp",
    imageAlt: "One troy ounce silver round from an assorted private mint",
    sortOrder: 22,
  },
  {
    slug: "tenth-oz-silver-round",
    name: "1/10 oz Silver Round",
    metal: "silver",
    type: "round",
    weightLabel: "1/10 oz",
    weightGrams: 3.1104,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "confirm",
    spreadPct: null,
    image: "/images/products/tenth-oz-silver-round.webp",
    imageAlt: "Tenth troy ounce silver round",
    sortOrder: 23,
  },
  {
    slug: "1-oz-silver-bar",
    name: "1 oz Silver Bar",
    metal: "silver",
    type: "bar",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/1-oz-silver-bar.webp",
    imageAlt: "One troy ounce silver bar",
    sortOrder: 24,
  },
  {
    slug: "10-oz-silver-bar",
    name: "10 oz Silver Bar (Assorted Refiners)",
    metal: "silver",
    type: "bar",
    weightLabel: "10 oz",
    weightGrams: 311.035,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/10-oz-silver-bar.webp",
    imageAlt: "Ten troy ounce silver bar from an assorted refiner",
    sortOrder: 25,
  },
  {
    slug: "100-oz-silver-bullion-bar",
    name: "100 oz Silver Bar",
    metal: "silver",
    type: "bar",
    weightLabel: "100 oz",
    weightGrams: 3110.35,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: 2.5,
    image: "/images/products/100-oz-silver-bullion-bar.webp",
    imageAlt: "One hundred troy ounce silver bar",
    featured: true,
    sortOrder: 26,
  },
  {
    slug: "1-kilo-silver-bar",
    name: "1 kg Silver Bar",
    metal: "silver",
    type: "bar",
    weightLabel: "1 kg",
    weightGrams: 1000,
    purity: ".999",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/1-kilo-silver-bar.webp",
    imageAlt: "One kilogram silver bar",
    sortOrder: 27,
  },
  {
    slug: "90-silver-dimes-quarters",
    name: "90% U.S. Silver Dimes & Quarters",
    metal: "silver",
    type: "historic",
    weightLabel: "Sold by face value",
    weightGrams: null,
    purity: ".900",
    denominations: [usd(0.1, "10¢"), usd(0.25, "25¢")],
    thicknessMm: null,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/90-silver-dimes-quarters.webp",
    imageAlt: "Pre-1965 90% silver U.S. dimes and quarters",
    sortOrder: 28,
  },
  {
    slug: "90-silver-half-dollars",
    name: "90% U.S. Silver Mixed Half Dollars",
    metal: "silver",
    type: "historic",
    weightLabel: "Sold by face value",
    weightGrams: null,
    purity: ".900",
    denominations: [usd(0.5, "50¢")],
    thicknessMm: null,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/90-silver-half-dollars.webp",
    imageAlt: "Pre-1965 90% silver U.S. half dollars, mixed dates",
    sortOrder: 29,
  },
  {
    slug: "morgan-silver-dollar-pre-1921",
    name: "Pre-1921 Morgan Silver Dollar",
    metal: "silver",
    type: "historic",
    weightLabel: "0.7734 oz ASW",
    weightGrams: 24.057,
    purity: ".900",
    denominations: [usd(1, "$1")],
    thicknessMm: null,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/morgan-silver-dollar-pre-1921.webp",
    imageAlt: "Pre-1921 Morgan silver dollar, 90% silver",
    sortOrder: 30,
  },
  {
    slug: "morgan-silver-dollar-1921",
    name: "1921 Morgan Silver Dollar",
    metal: "silver",
    type: "historic",
    weightLabel: "0.7734 oz ASW",
    weightGrams: 24.057,
    purity: ".900",
    denominations: [usd(1, "$1")],
    thicknessMm: null,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/morgan-silver-dollar-1921.webp",
    imageAlt: "1921 Morgan silver dollar, 90% silver",
    sortOrder: 31,
  },
  {
    slug: "peace-silver-dollar",
    name: "Peace Silver Dollar",
    metal: "silver",
    type: "historic",
    weightLabel: "0.7734 oz ASW",
    weightGrams: 24.057,
    purity: ".900",
    denominations: [usd(1, "$1")],
    thicknessMm: null,
    iraEligible: "no",
    spreadPct: null,
    image: "/images/products/peace-silver-dollar.webp",
    imageAlt: "Peace silver dollar, 90% silver",
    sortOrder: 32,
  },

  // ── Platinum ────────────────────────────────────────────────────────────
  {
    slug: "platinum-american-eagle-coin",
    name: "1 oz Platinum American Eagle Coin",
    metal: "platinum",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [usd(100, "$100")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: 3,
    image: "/images/products/platinum-american-eagle-coin.webp",
    imageAlt: "One troy ounce Platinum American Eagle bullion coin",
    featured: true,
    sortOrder: 33,
  },
  {
    slug: "proof-platinum-american-eagle",
    name: "1 oz Proof Platinum American Eagle (Box & Papers)",
    metal: "platinum",
    type: "proof",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [usd(100, "$100")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-platinum-american-eagle.webp",
    imageAlt:
      "One troy ounce Proof Platinum American Eagle coin with its presentation box and certificate",
    sortOrder: 34,
  },
  {
    slug: "proof-platinum-american-eagle-set-1-85-oz",
    name: "1.85 oz Proof Platinum American Eagle Set (Box & Papers)",
    metal: "platinum",
    type: "proof",
    weightLabel: "1.85 oz",
    weightGrams: 57.5415,
    purity: ".9995",
    denominations: [
      usd(100, "$100"),
      usd(50, "$50"),
      usd(25, "$25"),
      usd(10, "$10"),
    ],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/proof-platinum-american-eagle-set-1-85-oz.webp",
    imageAlt:
      "Four-coin Proof Platinum American Eagle set totalling 1.85 troy ounces, with presentation box and certificate",
    sortOrder: 35,
  },
  {
    slug: "platinum-canadian-maple-leaf",
    name: "1 oz Platinum Canadian Maple Leaf Coin",
    metal: "platinum",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [cad(50, "CA$50")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/platinum-canadian-maple-leaf.webp",
    imageAlt: "One troy ounce Platinum Canadian Maple Leaf coin",
    sortOrder: 36,
  },
  {
    slug: "platinum-britannia-1-oz",
    name: "1 oz Platinum Britannia Coin",
    metal: "platinum",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [gbp(100, "£100")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/platinum-britannia-1-oz.webp",
    imageAlt: "One troy ounce Platinum Britannia coin",
    sortOrder: 37,
  },
  {
    slug: "platinum-britannia-tenth-oz",
    name: "1/10 oz Platinum Britannia Coin",
    metal: "platinum",
    type: "coin",
    weightLabel: "1/10 oz",
    weightGrams: 3.1104,
    purity: ".9995",
    denominations: [gbp(10, "£10")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/platinum-britannia-tenth-oz.webp",
    imageAlt: "Tenth troy ounce Platinum Britannia coin",
    sortOrder: 38,
  },
  {
    slug: "1-oz-platinum-bullion-bar",
    name: "1 oz Platinum Bar",
    metal: "platinum",
    type: "bar",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: 2,
    image: "/images/products/1-oz-platinum-bullion-bar.webp",
    imageAlt: "One troy ounce platinum bar",
    featured: true,
    sortOrder: 39,
  },
  {
    slug: "platinum-1-gram-bar",
    name: "1 g Platinum Bar (In Assay)",
    metal: "platinum",
    type: "bar",
    weightLabel: "1 g",
    weightGrams: 1,
    purity: ".9995",
    denominations: [],
    thicknessMm: null,
    iraEligible: "confirm",
    spreadPct: null,
    image: "/images/products/platinum-1-gram-bar.webp",
    imageAlt: "One gram platinum bar sealed in its assay card",
    sortOrder: 40,
  },
  {
    slug: "platinum-25-gram-combibar",
    name: "25 × 1 g Platinum Bar Sheet (0.80375 oz)",
    metal: "platinum",
    type: "bar",
    weightLabel: "25 g",
    weightGrams: 25,
    purity: ".9995",
    denominations: [],
    thicknessMm: null,
    iraEligible: "confirm",
    spreadPct: null,
    image: "/images/products/platinum-25-gram-combibar.webp",
    imageAlt: "Sheet of twenty-five detachable one gram platinum bars",
    sortOrder: 41,
  },

  // ── Palladium ───────────────────────────────────────────────────────────
  {
    slug: "palladium-canadian-maple-leaf-coin",
    legacySlugs: ["palladium-canadian-maple-leaf-round"],
    name: "1 oz Palladium Canadian Maple Leaf Coin",
    metal: "palladium",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [cad(50, "CA$50")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: 4.5,
    image: "/images/products/palladium-canadian-maple-leaf-coin.webp",
    imageAlt: "One troy ounce Palladium Canadian Maple Leaf coin",
    featured: true,
    sortOrder: 42,
  },
  {
    slug: "palladium-american-eagle",
    name: "1 oz Palladium American Eagle Coin",
    metal: "palladium",
    type: "coin",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [usd(25, "$25")],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/palladium-american-eagle.webp",
    imageAlt: "One troy ounce Palladium American Eagle coin",
    sortOrder: 43,
  },
  {
    slug: "1-oz-palladium-bar",
    name: "1 oz Palladium Bar",
    metal: "palladium",
    type: "bar",
    weightLabel: "1 oz",
    weightGrams: 31.1035,
    purity: ".9995",
    denominations: [],
    thicknessMm: null,
    iraEligible: "yes",
    spreadPct: null,
    image: "/images/products/1-oz-palladium-bar.webp",
    imageAlt: "One troy ounce palladium bar",
    sortOrder: 44,
  },
];

/**
 * The Home page's eight cards, in the order Figma node 45:194 draws them —
 * which is not catalog order, so it is spelled out rather than derived from
 * `sortOrder`.
 */
const featuredOrder = [
  "gold-american-eagle-coin",
  "1-oz-gold-bullion-bar",
  "silver-american-eagle-coin",
  "100-oz-silver-bullion-bar",
  "gold-canadian-maple-leaf-coin",
  "platinum-american-eagle-coin",
  "palladium-canadian-maple-leaf-coin",
  "1-oz-platinum-bullion-bar",
];

export const featuredProducts: Product[] = featuredOrder.map((slug) => {
  const product = products.find((item) => item.slug === slug && item.featured);
  if (!product) throw new Error(`Featured product "${slug}" is not in the catalog.`);
  return product;
});

/** Catalog order, so every grouped view leads with gold. */
export const metalOrder: Metal[] = ["gold", "silver", "platinum", "palladium"];

export const metalLabels: Record<Metal, string> = {
  gold: "Gold",
  silver: "Silver",
  platinum: "Platinum",
  palladium: "Palladium",
};

export const typeOrder: ProductType[] = [
  "coin",
  "bar",
  "round",
  "proof",
  "historic",
];

export const typeLabels: Record<ProductType, string> = {
  coin: "Coins",
  bar: "Bars",
  round: "Rounds",
  proof: "Proof Coins & Sets",
  historic: "Historic U.S. Silver",
};

export const iraLabels: Record<IraStatus, string> = {
  yes: "IRA Eligible",
  confirm: "Ask About IRA Eligibility",
  no: "Non-IRA",
};

/**
 * Resolves a slug from a quote link — `/contact?product=<slug>` — through the
 * current slug or any legacy alias, so links issued before a rename keep
 * working.
 */
export function findProductBySlug(slug: string): Product | undefined {
  return products.find(
    (product) =>
      product.slug === slug || product.legacySlugs?.includes(slug) === true,
  );
}

/** Groups a list of products by metal, in `metalOrder`, dropping empty groups. */
export function groupByMetal(items: Product[]) {
  return metalOrder
    .map((metal) => ({
      metal,
      label: metalLabels[metal],
      items: items.filter((product) => product.metal === metal),
    }))
    .filter((group) => group.items.length > 0);
}

/** "Gold Spot + 2.4% Spread", or the on-request wording when no spread is set. */
export function formatSpread(product: Product): string {
  if (product.spreadPct === null) return "Premium on request";
  return `${metalLabels[product.metal]} Spot + ${product.spreadPct.toFixed(1)}% Spread`;
}

/** "1 oz · .9999 fine · $50" — the second line of every product card. */
export function formatSpecLine(product: Product): string {
  const face =
    product.denominations.length > 0
      ? product.denominations.map((d) => d.label).join(", ")
      : product.type === "proof"
        ? "Set contents to be confirmed"
        : "No face value";

  return `${product.weightLabel} · ${product.purity} fine · ${face}`;
}
