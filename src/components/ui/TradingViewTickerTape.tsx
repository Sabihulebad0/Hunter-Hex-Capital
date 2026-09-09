import { METALS, tradingViewEmbedSrc } from "@/lib/market";

/**
 * TradingView's free `ticker-tape` widget: one horizontal strip carrying all
 * four metals, for the spot-reference bar above the product grids (Figma
 * 45:188), where the design wants a single line rather than four cards.
 */
export function TradingViewTickerTape() {
  return (
    <iframe
      title="Live precious metals spot reference — TradingView"
      src={tradingViewEmbedSrc("ticker-tape", {
        symbols: METALS.map((metal) => ({
          proName: metal.ticker,
          title: metal.name,
        })),
        showSymbolLogo: false,
        isTransparent: true,
        displayMode: "compact",
        colorTheme: "dark",
        locale: "en",
      })}
      loading="lazy"
      scrolling="no"
      className="h-[46px] w-full border-0"
    />
  );
}
