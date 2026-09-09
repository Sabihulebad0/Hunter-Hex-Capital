/** Header nav — exact labels and order from Figma node 45:8. */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Footer nav — Figma node 45:438. Shorter list, and labels differ ("About Us", "Faq"). */
export const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Faq", href: "/#faq" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;
