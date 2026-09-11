import { Coins, Landmark, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { MetalCategory } from "@/data/products";

/**
 * Content for `/portfolio`.
 *
 * IMPORTANT — read before editing. `site.disclaimer` states that Hunter Hex
 * Capital representatives are not licensed financial advisors and do not give
 * investment advice. Everything in this file is therefore written as
 * *structure*, never as a recommendation or an outcome:
 *
 *   - no rates of return, gains, or performance figures of any kind;
 *   - no dollar amounts attached to a named or implied client;
 *   - the allocation shares below describe how a mix is composed, not how a
 *     reader should allocate.
 *
 * Adding performance numbers here would turn the page into a solicitation and
 * contradict the disclosure carried in the footer of every page.
 */

export type AllocationSlice = {
  metal: MetalCategory;
  /** Share of the metals sleeve, in percent. Each framework sums to 100. */
  share: number;
};

export type Framework = {
  id: string;
  name: string;
  icon: LucideIcon;
  /** What the structure is built to do — never what it is expected to earn. */
  objective: string;
  horizon: string;
  vehicle: string;
  custody: string;
  mix: AllocationSlice[];
};

/**
 * TODO(client): these four are composed from the service lines already approved
 * in `src/data/services.ts` and the IRA-eligible catalog in `products.ts`. They
 * illustrate shape only. Replace the shares with the desk's own standard
 * structures once the client signs them off.
 */
export const frameworks: Framework[] = [
  {
    id: "capital-preservation",
    name: "Capital Preservation",
    icon: ShieldCheck,
    objective:
      "Hold the largest possible share of the sleeve in the most liquid, most widely recognised metal, so a position can be unwound quickly and in any market.",
    horizon: "Open-ended",
    vehicle: "Cash purchase, non-IRA",
    custody: "Segregated vault or insured delivery",
    mix: [
      { metal: "gold", share: 80 },
      { metal: "silver", share: 20 },
    ],
  },
  {
    id: "retirement-rollover",
    name: "Retirement Rollover",
    icon: Landmark,
    objective:
      "Move part of a traditional 401(k) into certified physical metal without leaving the tax-advantaged wrapper. Every line is drawn from the IRA-eligible catalog.",
    horizon: "To retirement date",
    vehicle: "Gold & Silver IRA",
    custody: "Trust custodian, segregated",
    mix: [
      { metal: "gold", share: 65 },
      { metal: "silver", share: 25 },
      { metal: "platinum", share: 10 },
    ],
  },
  {
    id: "inflation-hedge",
    name: "Inflation Hedge",
    icon: Coins,
    objective:
      "Weight the sleeve towards metals with industrial as well as monetary demand, accepting wider spreads and more movement in exchange for that exposure.",
    horizon: "Medium term",
    vehicle: "Cash purchase, non-IRA",
    custody: "Segregated vault",
    mix: [
      { metal: "gold", share: 45 },
      { metal: "silver", share: 40 },
      { metal: "platinum", share: 10 },
      { metal: "palladium", share: 5 },
    ],
  },
  {
    id: "generational-transfer",
    name: "Generational Transfer",
    icon: Users,
    objective:
      "Structure a holding so it can pass to a trust or an estate intact — recognisable coinage, clean documentation, and custody a trustee can verify.",
    horizon: "Multi-generational",
    vehicle: "Trust & estate delivery",
    custody: "Segregated, trustee-verified",
    mix: [
      { metal: "gold", share: 70 },
      { metal: "platinum", share: 20 },
      { metal: "silver", share: 10 },
    ],
  },
];

export type Mandate = {
  id: string;
  /** Composite profile, never a real client. */
  profile: string;
  situation: string;
  structure: string;
  outcome: string;
};

/**
 * TODO(client): composite engagement profiles, written to show the shape of a
 * mandate — what was held, in what vehicle, under whose custody. They are not
 * case studies of real clients and deliberately record no figures. Swap them
 * for approved, anonymised real engagements when the client provides them, and
 * keep the "no numbers" rule above when you do.
 */
export const mandates: Mandate[] = [
  {
    id: "corporate-rollover",
    profile: "Retiring operations director",
    situation:
      "Leaving a corporate 401(k) and wanting part of the balance out of paper assets before drawdown began, without triggering a taxable event.",
    structure:
      "Direct rollover into a self-directed IRA, funded entirely from the IRA-eligible catalog and placed with a trust custodian.",
    outcome:
      "Metal held in segregated storage, with statements issued by the custodian rather than by us.",
  },
  {
    id: "family-trust",
    profile: "Family trust, second generation",
    situation:
      "Trustees needed a physical allocation that could be inventoried and verified by a party independent of the family.",
    structure:
      "Trust and estate delivery, recognisable sovereign coinage only, with assay documentation retained for each line.",
    outcome:
      "Holding is verifiable at the depository by any trustee, and passes without needing to be liquidated.",
  },
  {
    id: "owner-liquidity",
    profile: "Private business owner",
    situation:
      "Wanted a reserve held outside the banking system but reachable inside a week if the business needed it.",
    structure:
      "Non-IRA cash purchase, weighted to the most liquid coin sizes, in segregated storage with a stated buy-back process.",
    outcome:
      "Position can be unwound in recognised units without breaking up a large bar.",
  },
];

/** What a portfolio review actually covers — process, not advice. */
export const reviewSteps = [
  {
    number: "01",
    title: "Position & Horizon",
    description:
      "What the allocation is protecting, over what period, and whether it ever needs to be reachable in a hurry.",
  },
  {
    number: "02",
    title: "Vehicle & Eligibility",
    description:
      "Whether it belongs in an IRA, a trust, or a straight cash purchase — and which of the catalog is eligible for each.",
  },
  {
    number: "03",
    title: "Mix & Premium",
    description:
      "Which metals and which formats, with the premium over spot for every line shown in writing before anything is committed.",
  },
  {
    number: "04",
    title: "Custody & Exit",
    description:
      "Where it sits, who can verify it, and the process for selling it back when the time comes.",
  },
];
