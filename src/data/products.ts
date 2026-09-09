export type MetalCategory = "gold" | "silver" | "platinum" | "palladium";

export type Product = {
  id: string;
  name: string;
  category: MetalCategory;
  /** Premium over spot, exactly as written in the design. */
  spread: string;
  image: string;
  imageAlt: string;
  iraEligible: boolean;
};

/**
 * The eight products in Figma node 45:194, in design order.
 *
 * Figma reuses four photographs across the eight cards — that is the approved
 * design, not an oversight, so the `image` paths repeat deliberately.
 */
export const products: Product[] = [
  {
    id: "gold-american-eagle-coin",
    name: "Gold American Eagle Coin",
    category: "gold",
    spread: "Gold Spot + 2.4% Spread",
    image: "/images/products/gold-coin.webp",
    imageAlt: "Gold American Eagle coin showing the Walking Liberty obverse",
    iraEligible: true,
  },
  {
    id: "1-oz-gold-bullion-bar",
    name: "1 Oz Gold bullion Bar",
    category: "gold",
    spread: "Gold Spot + 1.8% Spread",
    image: "/images/products/gold-bar.webp",
    imageAlt: "One troy ounce gold bullion bar resting on a dark presentation tray",
    iraEligible: true,
  },
  {
    id: "silver-american-eagle-coin",
    name: "Silver American Eagle Coin",
    category: "silver",
    spread: "Silver Spot + 4.1% Spread",
    image: "/images/products/silver-coin.webp",
    imageAlt: "Silver American Eagle coin showing the Walking Liberty obverse",
    iraEligible: true,
  },
  {
    id: "100-oz-silver-bullion-bar",
    name: "100 Oz Silver Bullion Bar",
    category: "silver",
    spread: "Silver Spot + 2.5% Spread",
    image: "/images/products/silver-bar.webp",
    imageAlt: "One hundred troy ounce silver bullion bar",
    iraEligible: true,
  },
  {
    id: "gold-canadian-maple-leaf-coin",
    name: "Gold Canadian Maple Leaf Coin",
    category: "gold",
    spread: "Gold Spot + 2.2% Spread",
    image: "/images/products/gold-coin.webp",
    imageAlt: "Gold Canadian Maple Leaf bullion coin",
    iraEligible: true,
  },
  {
    id: "platinum-american-eagle-coin",
    name: "Platinum American Eagle Coin",
    category: "platinum",
    spread: "Platinum Spot + 3.0% Spread",
    image: "/images/products/silver-coin.webp",
    imageAlt: "Platinum American Eagle bullion coin",
    iraEligible: true,
  },
  {
    id: "palladium-canadian-maple-leaf-round",
    name: "Palladium Canadian Maple Leaf Round",
    category: "palladium",
    spread: "Palladium Spot + 4.5% Spread",
    image: "/images/products/gold-bar.webp",
    imageAlt: "Palladium Canadian Maple Leaf round",
    iraEligible: true,
  },
  {
    id: "1-oz-platinum-bullion-bar",
    name: "1 Oz Platinum Bullion Bar",
    category: "platinum",
    spread: "Platinum Spot + 2.0% Spread",
    image: "/images/products/gold-coin.webp",
    imageAlt: "One troy ounce platinum bullion bar",
    iraEligible: true,
  },
];

/** The home page shows the full eight-card grid from Figma. */
export const featuredProducts = products;
