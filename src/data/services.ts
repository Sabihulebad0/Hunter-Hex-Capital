import {
  Activity,
  Briefcase,
  Database,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Figma uses Lucide glyphs by name — these match one-for-one. */
  icon: LucideIcon;
};

/**
 * Four cards from Figma node 45:127, in design order. The design's fifth card
 * was withdrawn by the client (change request round 2).
 */
export const services: Service[] = [
  {
    id: "precious-metals-sales",
    title: "Precious Metals Sales",
    description:
      "Procure physical gold, silver, platinum and palladium coins & bullion easily.",
    icon: Briefcase,
  },
  {
    id: "gold-silver-ira-accounts",
    title: "Gold & Silver IRA Accounts",
    description:
      "Seamless rollover from your traditional 401(k) to secure physical metals.",
    icon: TrendingUp,
  },
  {
    id: "secure-depositories",
    title: "Secure Depositories",
    description:
      "Off-site, fully-segregated storage across sovereign, non-bank secure vault spaces.",
    icon: Database,
  },
  {
    id: "non-ira-accounts",
    title: "Non-IRA Accounts",
    description:
      "Customized cash-purchase storage plans with flexible liquidity options.",
    icon: Activity,
  },
];
