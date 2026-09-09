export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Figma shows the first item expanded by default (node 45:335). */
  defaultOpen?: boolean;
};

/**
 * Five questions from Figma node 45:334, in design order.
 *
 * Only the first item's answer exists in the design — the other four are drawn
 * collapsed with no answer text, and the client's live site has no FAQ section
 * to source them from.
 *
 * TODO(client): the four answers marked below are placeholders written strictly
 * from claims already made elsewhere in the approved design (the Services and
 * About sections). They assert no figures, guarantees, or terms of their own.
 * Replace them with client-approved copy before launch.
 */
export const faqItems: FaqItem[] = [
  {
    id: "how-does-a-gold-ira-work",
    question: "How does a Gold IRA work?",
    // Verbatim from Figma node 45:341.
    answer:
      "A self-directed gold IRA permits you to purchase IRS-certified physical metals and store them in an IRS-sanctioned secure depository under trust custody.",
    defaultOpen: true,
  },
  {
    id: "minimum-investment",
    question: "What is the minimum investment?",
    // TODO(client): awaiting approved copy — no figure is stated anywhere in the design or on the live site.
    answer:
      "Allocation minimums depend on the account type and the metals you select. Speak with a specialist and we will walk you through the options that fit your position.",
  },
  {
    id: "how-is-my-gold-stored",
    question: "How is my gold stored?",
    // TODO(client): awaiting approved copy — derived from the Secure Depositories service card.
    answer:
      "Metals are held in off-site, fully-segregated storage across sovereign, non-bank secure vault spaces, so your holding is never commingled with another client's.",
  },
  {
    id: "is-my-investment-insured",
    question: "Is my investment insured?",
    // TODO(client): awaiting approved copy — derived from the About section.
    answer:
      "We operate out of institutional-grade storage environments, ensuring that every asset is accounted for, fully insured, and completely verified.",
  },
  {
    id: "physical-delivery",
    question: "Can I take physical delivery?",
    // TODO(client): awaiting approved copy — derived from the Trust & Estate Delivery service card.
    answer:
      "Yes. We coordinate direct delivery alongside eligible storage, including logistics designed specifically for private trustees and family offices.",
  },
];
