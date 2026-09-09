/**
 * Business facts.
 *
 * Source of truth: https://hunterhexcapital.com/ (the client's live site).
 * The Figma contact block carries designer placeholders — `00000000000` and
 * `vinesvcv@gmail.com` — which are deliberately NOT used here. Per the build
 * spec §15/§31, business and legal information follows the approved live site.
 */
export const site = {
  name: "Hunter Hex Capital",
  legalName: "Hunter Hex Capital LLC",
  url: "https://hunterhexcapital.com",

  phone: "305-845-0757",
  phoneHref: "tel:+13058450757",

  email: "sales@hunterhexcapital.com",
  emailHref: "mailto:sales@hunterhexcapital.com",

  address: {
    street: "100 N. Biscayne Blvd, Suite 1302",
    city: "Miami",
    state: "FL",
    zip: "33132",
    /** Single-line form used in the contact block. */
    full: "100 N. Biscayne Blvd, Suite 1302, Miami, FL 33132",
  },

  /**
   * Verbatim disclosure from the live site. Legally relevant — do not trim.
   * Build spec §16.
   */
  disclaimer:
    "Hunter Hex Capital representatives are not licensed financial advisors and do not provide financial, tax, investment, or legal advice. Precious metals involve risk and may be worth more or less than their original cost when sold.",

  /** Live site wording for the market-data attribution. Build spec §12. */
  marketDataNotice:
    "Market data is supplied by TradingView for general information and may be delayed.",

  /**
   * TODO(client): no social profile URLs exist on the live site or in Figma.
   * The design shows four icons, so they render — populate these when the
   * client supplies the real profiles.
   */
  socials: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  },
} as const;
