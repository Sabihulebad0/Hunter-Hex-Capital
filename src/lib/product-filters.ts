import {
  KILOGRAM_TROY_OUNCES,
  TROY_OUNCE_GRAMS,
  metalLabels,
  metalOrder,
  typeLabels,
  typeOrder,
  type Denomination,
  type Product,
} from "@/data/products";

/**
 * Pure filter logic for `/products` — parsing the query string, matching
 * products, and building the faceted option lists with counts. Kept free of
 * React so the catalog component stays a thin view over it.
 *
 * Logic is OR within a group and AND across groups. Facet counts follow the
 * A-Mark convention: an option's count reflects every *other* active group, so
 * it reads as "how many results would I have if I also ticked this".
 */

export const FILTER_GROUPS = [
  "metal",
  "type",
  "weight",
  "thickness",
  "denom",
] as const;

export type FilterGroupKey = (typeof FILTER_GROUPS)[number];
export type WeightUnit = "oz" | "kg";

export type Filters = Record<FilterGroupKey, string[]> & {
  /** `?ira=1` — show only `iraEligible === "yes"`. */
  ira: boolean;
};

export type FilterState = {
  filters: Filters;
  unit: WeightUnit;
};

export const groupLabels: Record<FilterGroupKey, string> = {
  metal: "Metal",
  type: "Type",
  weight: "Weight",
  thickness: "Thickness (mm)",
  denom: "Denomination",
};

/** The value a product matches on when it has no face value. */
export const NO_FACE_VALUE = "none";

const currencyOrder: Denomination["currency"][] = [
  "USD",
  "CAD",
  "GBP",
  "EUR",
  "AUD",
];

export const currencyLabels: Record<Denomination["currency"], string> = {
  USD: "US Dollar",
  CAD: "Canadian Dollar",
  GBP: "Pound Sterling",
  EUR: "Euro",
  AUD: "Australian Dollar",
};

export const emptyFilters: Filters = {
  metal: [],
  type: [],
  weight: [],
  thickness: [],
  denom: [],
  ira: false,
};

// ── URL ↔ state ───────────────────────────────────────────────────────────

/** `?metal=gold,silver&weight=31.1035&unit=kg&ira=1` → state. */
export function parseFilters(params: URLSearchParams): FilterState {
  const filters: Filters = { ...emptyFilters };

  for (const group of FILTER_GROUPS) {
    const raw = params.get(group);
    filters[group] = raw ? raw.split(",").filter(Boolean) : [];
  }

  filters.ira = params.get("ira") === "1";

  return {
    filters,
    unit: params.get("unit") === "kg" ? "kg" : "oz",
  };
}

/** State → query string (without the leading `?`); "" when nothing is set. */
export function serializeFilters({ filters, unit }: FilterState): string {
  const params = new URLSearchParams();

  for (const group of FILTER_GROUPS) {
    if (filters[group].length > 0) params.set(group, filters[group].join(","));
  }

  if (filters.ira) params.set("ira", "1");
  if (unit === "kg") params.set("unit", "kg");

  return params.toString();
}

export function countActiveFilters(filters: Filters): number {
  return (
    FILTER_GROUPS.reduce((sum, group) => sum + filters[group].length, 0) +
    (filters.ira ? 1 : 0)
  );
}

// ── Matching ──────────────────────────────────────────────────────────────

export function denominationKey(denomination: Denomination): string {
  return `${denomination.currency}-${denomination.value}`;
}

/** The values a product carries for a group — what a selection is matched on. */
export function productValues(product: Product, group: FilterGroupKey): string[] {
  switch (group) {
    case "metal":
      return [product.metal];
    case "type":
      return [product.type];
    case "weight":
      return product.weightGrams === null ? [] : [String(product.weightGrams)];
    case "thickness":
      return product.thicknessMm === null ? [] : [String(product.thicknessMm)];
    case "denom":
      return product.denominations.length === 0
        ? [NO_FACE_VALUE]
        : product.denominations.map(denominationKey);
  }
}

function matchesGroup(
  product: Product,
  group: FilterGroupKey,
  selected: string[],
): boolean {
  if (selected.length === 0) return true;
  return productValues(product, group).some((value) => selected.includes(value));
}

/**
 * Whether a product passes every active group, optionally ignoring one — that
 * exception is how facet counts are computed.
 */
export function matchesFilters(
  product: Product,
  filters: Filters,
  except?: FilterGroupKey | "ira",
): boolean {
  if (except !== "ira" && filters.ira && product.iraEligible !== "yes") {
    return false;
  }

  return FILTER_GROUPS.every(
    (group) => group === except || matchesGroup(product, group, filters[group]),
  );
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((product) => matchesFilters(product, filters));
}

// ── Facets ────────────────────────────────────────────────────────────────

export type FacetOption = {
  value: string;
  label: string;
  /** Results if this option were (also) selected, given the other groups. */
  count: number;
  selected: boolean;
};

export type FacetGroup = {
  key: FilterGroupKey;
  label: string;
  /** Denominations are split by currency; everything else is one section. */
  sections: { heading?: string; options: FacetOption[] }[];
};

/**
 * Every option a group can offer, generated from the catalog rather than
 * written by hand, so a new product with a new weight or face value shows up
 * on its own.
 */
function baseOptions(
  products: Product[],
  group: FilterGroupKey,
  unit: WeightUnit,
): { heading?: string; options: { value: string; label: string }[] }[] {
  switch (group) {
    case "metal":
      return [
        {
          options: metalOrder
            .filter((metal) => products.some((p) => p.metal === metal))
            .map((metal) => ({ value: metal, label: metalLabels[metal] })),
        },
      ];

    case "type":
      return [
        {
          options: typeOrder
            .filter((type) => products.some((p) => p.type === type))
            .map((type) => ({ value: type, label: typeLabels[type] })),
        },
      ];

    case "weight": {
      const grams = [
        ...new Set(
          products.flatMap((p) => (p.weightGrams === null ? [] : [p.weightGrams])),
        ),
      ].sort((a, b) => a - b);

      return [
        {
          options: grams.map((value) => ({
            value: String(value),
            label: formatWeightOption(value, unit, products),
          })),
        },
      ];
    }

    case "thickness": {
      const values = [
        ...new Set(
          products.flatMap((p) => (p.thicknessMm === null ? [] : [p.thicknessMm])),
        ),
      ].sort((a, b) => a - b);

      return [
        {
          options: values.map((value) => ({
            value: String(value),
            label: formatThickness(value),
          })),
        },
      ];
    }

    case "denom": {
      const byKey = new Map<string, Denomination>();
      for (const product of products) {
        for (const denomination of product.denominations) {
          const key = denominationKey(denomination);
          if (!byKey.has(key)) byKey.set(key, denomination);
        }
      }

      const sections = currencyOrder
        .map((currency) => ({
          heading: currencyLabels[currency],
          options: [...byKey.values()]
            .filter((d) => d.currency === currency)
            .sort((a, b) => a.value - b.value)
            .map((d) => ({ value: denominationKey(d), label: d.label })),
        }))
        .filter((section) => section.options.length > 0);

      if (products.some((p) => p.denominations.length === 0)) {
        sections.push({
          heading: "Other",
          options: [{ value: NO_FACE_VALUE, label: "No face value" }],
        });
      }

      return sections;
    }
  }
}

/**
 * The full facet tree with live counts. Options at zero are kept in the list
 * (the view hides or disables them) so a selected option never vanishes from
 * under the visitor.
 */
export function buildFacets(
  products: Product[],
  filters: Filters,
  unit: WeightUnit,
): FacetGroup[] {
  return FILTER_GROUPS.map((group) => {
    // Products that pass every *other* group — the pool each option counts in.
    const pool = products.filter((p) => matchesFilters(p, filters, group));

    return {
      key: group,
      label: groupLabels[group],
      sections: baseOptions(products, group, unit).map((section) => ({
        heading: section.heading,
        options: section.options.map((option) => ({
          ...option,
          count: pool.filter((p) =>
            productValues(p, group).includes(option.value),
          ).length,
          selected: filters[group].includes(option.value),
        })),
      })),
    };
  });
}

/** How many products the IRA toggle would leave, given the other groups. */
export function iraOnlyCount(products: Product[], filters: Filters): number {
  return products.filter(
    (p) => p.iraEligible === "yes" && matchesFilters(p, filters, "ira"),
  ).length;
}

// ── Labels ────────────────────────────────────────────────────────────────

function trimZeros(value: string): string {
  return value.includes(".") ? value.replace(/\.?0+$/, "") : value;
}

/** 31.1035 → "0.031 kg"; 1000 → "1 kg"; 3110.35 → "3.11 kg". */
export function formatKilograms(grams: number): string {
  const kg = grams / 1000;
  return `${kg >= 1 ? trimZeros(kg.toFixed(3)) : kg.toFixed(3)} kg`;
}

/** 1000 → "32.15 oz"; 1 → "0.03 oz". */
export function formatTroyOunces(grams: number): string {
  const oz = grams >= 1000 ? (grams / 1000) * KILOGRAM_TROY_OUNCES : grams / TROY_OUNCE_GRAMS;
  return `${trimZeros(oz.toFixed(2))} oz`;
}

const nativeLabel = /^(\d+(\.\d+)?|\d+\/\d+) (oz|g|kg)$/;

/**
 * The label a weight option shows.
 *
 * In `oz` mode that is the label the products themselves carry ("1/10 oz",
 * "1 kg"), with the troy-ounce equivalent alongside metric sizes; historic
 * coinage sold by silver weight reads "~0.77 oz". In `kg` mode every option is
 * converted. Display only — matching is always on grams.
 */
export function formatWeightOption(
  grams: number,
  unit: WeightUnit,
  products: Product[],
): string {
  if (unit === "kg") return formatKilograms(grams);

  const native = products.find(
    (p) => p.weightGrams === grams && nativeLabel.test(p.weightLabel),
  )?.weightLabel;

  if (!native) return `~${formatTroyOunces(grams)}`;
  if (native.endsWith(" oz")) return native;

  return `${native} (${formatTroyOunces(grams)})`;
}

export function formatThickness(mm: number): string {
  return `${mm.toFixed(2)} mm`;
}

/** The label an active-filter chip shows for a selected value. */
export function describeSelection(
  group: FilterGroupKey,
  value: string,
  facets: FacetGroup[],
): string {
  const facet = facets.find((f) => f.key === group);
  const option = facet?.sections
    .flatMap((section) => section.options)
    .find((o) => o.value === value);

  return option?.label ?? value;
}
