export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  avatar: string;
  rating: number;
};

/** Three cards from Figma node 45:263, in design order. All show five stars. */
export const testimonials: Testimonial[] = [
  {
    id: "robert-g",
    quote:
      "The Gold IRA transition was handled perfectly. Their logistics support saved me weeks of stress.",
    author: "Robert G. - Retired Engineer",
    avatar: "/images/avatars/robert-g.webp",
    rating: 5,
  },
  {
    id: "janelle-s",
    quote:
      "Hunter Hex Capital serves our clients with utmost professionalism. Highly recommended for trust assets.",
    author: "Janelle S. - Estate Attorney",
    avatar: "/images/avatars/janelle-s.webp",
    rating: 5,
  },
  {
    id: "arthur-l",
    quote:
      "Transparent premiums, locked pricing spreads, and secured delivery. Best bullion experience around.",
    author: "Dr. Arthur L. - Family Office",
    avatar: "/images/avatars/arthur-l.webp",
    rating: 5,
  },
];

/** Trust row beneath the cards — Figma node 45:312. */
export const trustPlatforms = [
  "Google Reviews",
  "BBB Accredited",
  "Trustpilot Verified",
  "Consumer Affairs",
] as const;
