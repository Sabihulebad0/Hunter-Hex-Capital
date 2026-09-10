/**
 * Header nav — labels and order are exactly Figma node 45:8.
 *
 * The design was drawn as a one-page scroll, so every item pointed at a home
 * page anchor. Now that each of those sections has a dedicated route, the nav
 * targets the route instead; the home page keeps its section ids, so the
 * anchors still resolve for anything that links to them.
 */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer nav — Figma node 45:438. Shorter list, and labels differ ("About Us", "Faq"). */
export const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Faq", href: "/faq" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;
