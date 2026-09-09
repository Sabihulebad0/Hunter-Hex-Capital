/**
 * The four metals shown across the site, and the TradingView embed plumbing
 * that puts live rates on screen.
 *
 * The client's brief asks for "four stock prices form live market as per the
 * staging". The tickers below are the ones the live site at
 * hunterhexcapital.com already uses, and live rates come from the same place it
 * gets them: TradingView's free embed widgets.
 *
 * The widgets are iframes that fetch and refresh their own data in the browser,
 * so there is no server fetch, no API key and no rate limit to manage here —
 * and no risk of a scraped endpoint changing shape underneath us. The trade-off
 * is that price text lives inside TradingView's iframe and cannot be restyled
 * to the Figma type scale; the surrounding card is ours.
 *
 * Attribution is handled by the widgets' own TradingView branding, and restated
 * in `site.marketDataNotice`.
 */

export type MetalSymbol = "XAU" | "XAG" | "XPT" | "XPD";

export type Metal = {
  symbol: MetalSymbol;
  /** Display label from the design, e.g. "Gold (XAU)". */
  label: string;
  /** Bare metal name, for the compact spot bar. */
  name: string;
  /** TradingView ticker, copied from the live site's widget config. */
  ticker: string;
};

export const METALS: Metal[] = [
  { symbol: "XAU", label: "Gold (XAU)", name: "Gold", ticker: "TVC:GOLD" },
  { symbol: "XAG", label: "Silver (XAG)", name: "Silver", ticker: "TVC:SILVER" },
  {
    symbol: "XPT",
    label: "Platinum (XPT)",
    name: "Platinum",
    ticker: "TVC:PLATINUM",
  },
  {
    symbol: "XPD",
    label: "Palladium (XPD)",
    name: "Palladium",
    ticker: "TVC:PALLADIUM",
  },
];

const EMBED_BASE = "https://s.tradingview.com/embed-widget";

/**
 * Builds an embed URL. TradingView reads the widget config from the URL
 * fragment as encoded JSON — the same form the live site uses, which lets these
 * render from a server component with no client-side script tag.
 */
export function tradingViewEmbedSrc(
  widget: "single-quote" | "ticker-tape",
  config: Record<string, unknown>,
): string {
  const encoded = encodeURIComponent(JSON.stringify(config));

  return `${EMBED_BASE}/${widget}/?locale=en#${encoded}`;
}
