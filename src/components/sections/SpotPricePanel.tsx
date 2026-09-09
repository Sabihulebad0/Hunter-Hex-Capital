import { METALS } from "@/lib/market";
import { TradingViewQuote } from "@/components/ui/TradingViewQuote";

/**
 * Figma node 45:31 — the four-metal live price card in the hero.
 *
 * The client's brief asked for four live prices here rather than the two on the
 * earlier mockup, sourced the way the live site sources them: each row pairs the
 * designed metal label with TradingView's free single-quote widget, which keeps
 * itself current in the browser.
 */
export function SpotPricePanel() {
  return (
    <div className="flex flex-col gap-6 rounded-[20px] border-2 border-hh-gold-dark bg-hh-deep p-6 hh-glow lg:p-8">
      {/* card-header (45:32) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full bg-hh-gold"
            aria-hidden
          />
          <span className="text-[12px] font-bold uppercase text-hh-muted">
            Live Spot Prices (USD)
          </span>
        </div>

        <span className="shrink-0 rounded-[4px] bg-white/8 px-2 py-1 text-[11px] font-bold text-hh-gold">
          10s DELAY
        </span>
      </div>

      {/* ticker-rows (45:38) */}
      <ul className="flex flex-col gap-4">
        {METALS.map((metal) => (
          <li
            key={metal.symbol}
            className="flex flex-col gap-1 rounded-[12px] border border-[var(--hh-hairline)] bg-hh-deep px-4 pb-1 pt-3"
          >
            <div className="flex shrink-0 flex-col gap-1 whitespace-nowrap">
              <span className="text-[16px] font-bold text-hh-cream lg:text-[18px]">
                {metal.label}
              </span>
              <span className="text-[12px] text-hh-muted">Per Troy Ounce</span>
            </div>

            {/* The widget renders its own price and delta, right-aligned by its
                own layout at this width. */}
            <div className="min-w-0">
              <TradingViewQuote metal={metal} />
            </div>
          </li>
        ))}
      </ul>

      <p className="text-center text-[12px] text-hh-muted">
        Locked spreads &amp; guaranteed premium pricing. Talk to an expert to lock
        in prices.
      </p>
    </div>
  );
}
