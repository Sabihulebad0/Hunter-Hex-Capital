export type GalleryItem = {
  id: string;
  label: string;
  image: string;
  alt: string;
};

/** Six tiles from Figma node 45:239, in design order. */
export const galleryItems: GalleryItem[] = [
  {
    id: "secure-reserves",
    label: "Secure Reserves",
    image: "/images/gallery/secure-reserves.webp",
    alt: "Stacked gold bullion bars inside a secure vault",
  },
  {
    id: "federal-depository",
    label: "Federal Depository",
    image: "/images/gallery/federal-depository.webp",
    alt: "Reinforced depository vault door",
  },
  {
    id: "private-wealth-consulting",
    label: "Private Wealth Consulting",
    image: "/images/gallery/private-wealth-consulting.webp",
    alt: "Consultants meeting with a client in a boardroom",
  },
  {
    id: "silver-eagle-bullion",
    label: "Silver Eagle Bullion",
    image: "/images/gallery/silver-eagle-bullion.webp",
    alt: "Stacked Silver Eagle bullion coins",
  },
  {
    id: "armed-delivery",
    label: "Armed Delivery",
    image: "/images/gallery/armed-delivery.webp",
    alt: "Armoured transport vehicle with security escort",
  },
  {
    id: "gold-monograms",
    label: "Gold Monograms",
    image: "/images/gallery/gold-monograms.webp",
    alt: "Octagonal engraved gold monogram piece",
  },
];
