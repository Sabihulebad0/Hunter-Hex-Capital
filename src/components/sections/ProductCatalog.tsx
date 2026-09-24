"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { groupByMetal, products } from "@/data/products";
import {
  FILTER_GROUPS,
  buildFacets,
  countActiveFilters,
  describeSelection,
  emptyFilters,
  filterProducts,
  iraOnlyCount,
  parseFilters,
  serializeFilters,
  type FacetGroup,
  type FilterGroupKey,
  type FilterState,
  type WeightUnit,
} from "@/lib/product-filters";
import { cn } from "@/lib/utils";

/**
 * The filterable `/products` catalog — change request round 2, Task 4.
 *
 * Filter state lives in the query string (`?metal=gold&weight=31.1035&unit=kg`)
 * so a filtered view can be shared and bookmarked. A local copy of that state
 * answers each click immediately; `router.replace` then writes it to the URL
 * without scrolling, and back/forward navigation flows the other way.
 *
 * Filtering runs client-side over the static catalog — 44 rows, so there is
 * nothing to paginate and every facet is recomputed with `useMemo`.
 *
 * Must be rendered inside `<Suspense>`: `useSearchParams` on a prerendered
 * route client-renders everything up to the nearest boundary.
 */
export function ProductCatalog({
  imageAvailability,
}: {
  /** `slug → true` when the product's photo exists on disk. */
  imageAvailability: Record<string, boolean>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<FilterState>(() =>
    parseFilters(searchParams),
  );

  // The query string this component last wrote. A URL that differs from it
  // arrived from outside (back/forward, a pasted link) and wins over local
  // state; one that matches is just our own write landing.
  const lastWritten = useRef<string | null>(null);
  const urlQuery = searchParams.toString();

  useEffect(() => {
    const incoming = parseFilters(new URLSearchParams(urlQuery));
    if (
      lastWritten.current !== null &&
      serializeFilters(incoming) === lastWritten.current
    ) {
      return;
    }
    setState(incoming);
  }, [urlQuery]);

  const update = useCallback(
    (next: FilterState) => {
      setState(next);
      const query = serializeFilters(next);
      lastWritten.current = query;
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const { filters, unit } = state;

  const toggleValue = (group: FilterGroupKey, value: string) => {
    const current = filters[group];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update({ filters: { ...filters, [group]: next }, unit });
  };

  const setIra = (ira: boolean) => update({ filters: { ...filters, ira }, unit });
  const setUnit = (nextUnit: WeightUnit) => update({ filters, unit: nextUnit });
  const clearAll = () => update({ filters: { ...emptyFilters }, unit });

  const results = useMemo(() => filterProducts(products, filters), [filters]);
  const groups = useMemo(() => groupByMetal(results), [results]);
  const facets = useMemo(
    () => buildFacets(products, filters, unit),
    [filters, unit],
  );
  const iraCount = useMemo(() => iraOnlyCount(products, filters), [filters]);
  const activeCount = countActiveFilters(filters);

  // ── Mobile drawer ───────────────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Return focus to the "Filters" button when the drawer closes, so a keyboard
  // user lands back where they left the page.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !drawerOpen) triggerRef.current?.focus();
    wasOpen.current = drawerOpen;
  }, [drawerOpen]);

  const panelProps = {
    facets,
    filters,
    unit,
    iraCount,
    onToggle: toggleValue,
    onIra: setIra,
    onUnit: setUnit,
  };

  const activeChips = FILTER_GROUPS.flatMap((group) =>
    filters[group].map((value) => ({
      key: `${group}:${value}`,
      label: describeSelection(group, value, facets),
      remove: () => toggleValue(group, value),
    })),
  ).concat(
    filters.ira
      ? [{ key: "ira", label: "IRA eligible only", remove: () => setIra(false) }]
      : [],
  );

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Desktop sidebar */}
        <aside
          aria-label="Product filters"
          className="hidden lg:sticky lg:top-[104px] lg:block lg:max-h-[calc(100vh-128px)] lg:w-[260px] lg:shrink-0 lg:overflow-y-auto lg:[scrollbar-width:thin] lg:[scrollbar-color:var(--color-hh-gold-dark)_transparent] lg:rounded-[16px] lg:border lg:border-[var(--hh-hairline)] lg:bg-hh-deep lg:p-5"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[16px] font-bold uppercase text-hh-gold">
              Filters
            </h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[13px] font-bold text-hh-cream hover:text-hh-gold"
              >
                Clear all
              </button>
            )}
          </div>

          <FilterPanel {...panelProps} />
        </aside>

        {/* Results */}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p
                role="status"
                aria-live="polite"
                className="text-[14px] font-medium text-hh-muted"
              >
                Showing{" "}
                <span className="font-bold text-hh-cream">{results.length}</span>{" "}
                of {products.length} products
              </p>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                className="inline-flex items-center gap-2 rounded-[8px] border border-hh-gold-dark px-4 py-2.5 text-[14px] font-bold text-hh-cream transition-colors hover:bg-hh-gold-dark/15 lg:hidden"
              >
                <SlidersHorizontal size={16} aria-hidden />
                Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
            </div>

            {activeChips.length > 0 && (
              <ul
                aria-label="Active filters"
                className="flex flex-wrap items-center gap-2"
              >
                {activeChips.map((chip) => (
                  <li key={chip.key}>
                    <button
                      type="button"
                      onClick={chip.remove}
                      className="inline-flex items-center gap-1.5 rounded-[100px] border border-hh-gold-dark bg-hh-deep py-1.5 pl-3 pr-2 text-[13px] font-bold text-hh-gold transition-colors hover:bg-hh-gold-dark/15"
                    >
                      {chip.label}
                      <X size={14} aria-hidden />
                      <span className="sr-only">Remove filter</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-2 py-1.5 text-[13px] font-bold text-hh-cream hover:text-hh-gold"
                  >
                    Clear all
                  </button>
                </li>
              </ul>
            )}
          </div>

          {groups.length === 0 ? (
            <div className="flex flex-col items-center gap-5 rounded-[16px] border border-[var(--hh-hairline)] bg-hh-deep px-6 py-14 text-center">
              <p className="text-[20px] font-bold text-hh-cream">
                No products match these filters.
              </p>
              <p className="max-w-[460px] text-[15px] leading-[1.6] text-[var(--hh-dim)]">
                Loosen a filter, or tell the desk what you are after and we will
                source it.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center rounded-[8px] border border-hh-gold-dark bg-hh-gold px-[28px] py-[14px] text-[16px] font-bold text-hh-green hh-glow transition-colors hover:bg-[#e3c88a]"
                >
                  Clear filters
                </button>
                <ButtonLink href="/contact" variant="secondary">
                  Speak With a Specialist
                </ButtonLink>
              </div>
            </div>
          ) : (
            <ProductResultsGrid
              groups={groups}
              imageAvailability={imageAvailability}
            />
          )}
        </div>
      </div>

      {drawerOpen && (
        <FilterDrawer
          onClose={closeDrawer}
          onClear={clearAll}
          resultCount={results.length}
          activeCount={activeCount}
        >
          <FilterPanel {...panelProps} />
        </FilterDrawer>
      )}
    </>
  );
}

// ── Results grid ──────────────────────────────────────────────────────────

/**
 * The grouped card grid. No hooks, so it also renders on the server as the
 * catalog's Suspense fallback — the full, unfiltered catalog is in the initial
 * HTML for crawlers, and the client swaps in the filtered view on hydration.
 */
export function ProductResultsGrid({
  groups,
  imageAvailability,
}: {
  groups: ReturnType<typeof groupByMetal>;
  imageAvailability: Record<string, boolean>;
}) {
  return groups.map((group) => (
    <div
      key={group.metal}
      id={group.metal}
      className="flex scroll-mt-[104px] flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-[24px] font-bold text-hh-cream lg:text-[28px]">
          {group.label}
        </h2>
        <span className="h-px flex-1 bg-[var(--hh-hairline)]" aria-hidden />
        <span className="text-[14px] font-medium text-hh-muted">
          {group.items.length}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {group.items.map((product) => (
          <li key={product.slug} className="h-full">
            <ProductCard
              product={product}
              imageAvailable={imageAvailability[product.slug] ?? false}
            />
          </li>
        ))}
      </ul>
    </div>
  ));
}

/**
 * What the server prerenders in the catalog's place: the same two-column
 * layout with the whole catalog, so nothing jumps when the client takes over.
 */
export function ProductCatalogFallback({
  imageAvailability,
}: {
  imageAvailability: Record<string, boolean>;
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <aside
        aria-hidden
        className="hidden lg:block lg:w-[260px] lg:shrink-0 lg:rounded-[16px] lg:border lg:border-[var(--hh-hairline)] lg:bg-hh-deep lg:p-5"
      >
        <h2 className="mb-2 text-[16px] font-bold uppercase text-hh-gold">
          Filters
        </h2>
        <p className="py-4 text-[13px] text-hh-muted">Loading filters…</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <p className="text-[14px] font-medium text-hh-muted">
          Showing{" "}
          <span className="font-bold text-hh-cream">{products.length}</span> of{" "}
          {products.length} products
        </p>

        <ProductResultsGrid
          groups={groupByMetal(products)}
          imageAvailability={imageAvailability}
        />
      </div>
    </div>
  );
}

// ── Filter panel ──────────────────────────────────────────────────────────

type PanelProps = {
  facets: FacetGroup[];
  filters: FilterState["filters"];
  unit: WeightUnit;
  iraCount: number;
  onToggle: (group: FilterGroupKey, value: string) => void;
  onIra: (ira: boolean) => void;
  onUnit: (unit: WeightUnit) => void;
};

/** Metal and Type start open; the finer groups start collapsed. */
const openByDefault: Record<FilterGroupKey, boolean> = {
  metal: true,
  type: true,
  weight: false,
  thickness: false,
  denom: false,
};

/** Groups kept in the filter logic but not shown in the panel. */
const hiddenGroups: FilterGroupKey[] = ["denom"];

function FilterPanel({
  facets,
  filters,
  unit,
  iraCount,
  onToggle,
  onIra,
  onUnit,
}: PanelProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label className="flex cursor-pointer items-center gap-3 border-b border-[var(--hh-hairline)] py-4 text-[14px] font-bold text-hh-cream">
        <input
          type="checkbox"
          checked={filters.ira}
          onChange={(event) => onIra(event.target.checked)}
          className="size-4 shrink-0 accent-hh-gold"
        />
        <span className="flex-1">IRA eligible only</span>
        <span className="text-[12px] font-medium text-hh-muted">({iraCount})</span>
      </label>

      {facets
        .filter((facet) => !hiddenGroups.includes(facet.key))
        .map((facet) => (
          <FacetSection
            key={facet.key}
            facet={facet}
            defaultOpen={openByDefault[facet.key] || filters[facet.key].length > 0}
            onToggle={onToggle}
            extra={
              facet.key === "weight" ? (
                <UnitToggle id={`${id}-unit`} unit={unit} onUnit={onUnit} />
              ) : undefined
            }
          />
        ))}
    </div>
  );
}

function FacetSection({
  facet,
  defaultOpen,
  onToggle,
  extra,
}: {
  facet: FacetGroup;
  defaultOpen: boolean;
  onToggle: (group: FilterGroupKey, value: string) => void;
  extra?: React.ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const selectedCount = facet.sections
    .flatMap((section) => section.options)
    .filter((option) => option.selected).length;

  return (
    <fieldset className="min-w-0 border-b border-[var(--hh-hairline)] py-2 last:border-b-0">
      <legend className="w-full p-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={`${id}-options`}
          className="flex w-full items-center justify-between gap-3 py-2 text-left text-[14px] font-bold text-hh-cream hover:text-hh-gold"
        >
          <span>
            {facet.label}
            {selectedCount > 0 && (
              <span className="ml-2 rounded-[100px] bg-hh-gold px-2 py-0.5 text-[11px] text-hh-green">
                {selectedCount}
              </span>
            )}
          </span>
          <ChevronDown
            size={16}
            aria-hidden
            className={cn("shrink-0 transition-transform", open && "rotate-180")}
          />
        </button>
      </legend>

      <div id={`${id}-options`} hidden={!open} className="flex flex-col gap-1 pb-2">
        {extra}

        {facet.sections.map((section, index) => (
          <div key={section.heading ?? index} className="flex flex-col">
            {section.heading && (
              <span className="pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-hh-muted">
                {section.heading}
              </span>
            )}

            {section.options.map((option) => {
              const disabled = option.count === 0 && !option.selected;

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 py-1.5 text-[14px] text-hh-cream",
                    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
                  )}
                >
                  <input
                    type="checkbox"
                    name={facet.key}
                    value={option.value}
                    checked={option.selected}
                    disabled={disabled}
                    onChange={() => onToggle(facet.key, option.value)}
                    className="size-4 shrink-0 accent-hh-gold"
                  />
                  <span className="flex-1">{option.label}</span>
                  <span className="text-[12px] text-hh-muted">
                    ({option.count})
                  </span>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function UnitToggle({
  id,
  unit,
  onUnit,
}: {
  id: string;
  unit: WeightUnit;
  onUnit: (unit: WeightUnit) => void;
}) {
  const units: WeightUnit[] = ["oz", "kg"];

  return (
    <fieldset className="mb-1 flex items-center justify-between gap-3">
      <legend className="sr-only">Weight unit</legend>
      <span className="text-[12px] text-hh-muted" aria-hidden>
        Show weights in
      </span>
      <div className="inline-flex overflow-hidden rounded-[6px] border border-[var(--hh-hairline)]">
        {units.map((value) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name={id}
              value={value}
              checked={unit === value}
              onChange={() => onUnit(value)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "block px-3 py-1 text-[12px] font-bold uppercase transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-hh-gold",
                unit === value
                  ? "bg-hh-gold text-hh-green"
                  : "text-hh-cream hover:text-hh-gold",
              )}
            >
              {value}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ── Mobile drawer ─────────────────────────────────────────────────────────

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function FilterDrawer({
  onClose,
  onClear,
  resultCount,
  activeCount,
  children,
}: {
  onClose: () => void;
  onClear: () => void;
  resultCount: number;
  activeCount: number;
  children: React.ReactNode;
}) {
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll behind the open drawer.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Esc closes; Tab cycles inside the panel.
  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusable),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close filters"
        className="absolute inset-0 bg-hh-deep/70"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col border-l border-[var(--hh-hairline)] bg-hh-deep shadow-[0px_8px_12px_rgba(184,146,90,0.25)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--hh-hairline)] px-5 py-4">
          <h2 id={`${id}-title`} className="text-[16px] font-bold uppercase text-hh-gold">
            Filters{activeCount > 0 && ` (${activeCount})`}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex size-10 items-center justify-center rounded-[8px] border border-[var(--hh-hairline)] text-hh-cream hover:text-hh-gold"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 [scrollbar-color:var(--color-hh-gold-dark)_transparent] [scrollbar-width:thin]">
          {children}
        </div>

        <div className="flex items-center gap-3 border-t border-[var(--hh-hairline)] p-5">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex flex-1 items-center justify-center rounded-[8px] border-[1.5px] border-hh-gold-dark px-4 py-[14px] text-[15px] font-bold text-hh-cream transition-colors hover:bg-hh-gold-dark/15"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex flex-1 items-center justify-center rounded-[8px] border border-hh-gold-dark bg-hh-gold px-4 py-[14px] text-[15px] font-bold text-hh-green hh-glow transition-colors hover:bg-[#e3c88a]"
          >
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </button>
        </div>
      </div>
    </div>
  );
}
