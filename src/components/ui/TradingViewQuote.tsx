import { tradingViewEmbedSrc, type Metal } from "@/lib/market";

/**
 * TradingView's free `single-quote` widget for one metal — the same widget, and
 * the same config, the live site embeds.
 *
 * The iframe keeps its own price current, so nothing here re-renders.
 */
export function TradingViewQuote({ metal }: { metal: Metal }) {
  return (
    <iframe
      title={`${metal.name} live price — TradingView`}
      src={tradingViewEmbedSrc("single-quote", {
        symbol: metal.ticker,
        width: "100%",
        colorTheme: "dark",
        isTransparent: true,
        locale: "en",
      })}
      loading="lazy"
      // The widget draws its own layout at its own size; scrollbars would only
      // ever be chrome around it.
      scrolling="no"
      className="h-[96px] w-full border-0"
    />
  );
}
