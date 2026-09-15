import { useId } from "react";
import type { Metal, ProductType } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Stand-in for a product photograph that has not been supplied yet.
 *
 * Coins, proofs, rounds and historic coinage draw as a circular medallion;
 * bars as a rectangular ingot. Each is tinted for its metal on the dark ground
 * and carries the weight engraved in the centre, so the card still reads at a
 * glance. Pure SVG and CSS — no external assets.
 */

const tint: Record<
  Metal,
  { light: string; mid: string; dark: string; text: string }
> = {
  gold: { light: "#f0d99a", mid: "#d9b872", dark: "#8c6a34", text: "#3a2a10" },
  silver: { light: "#e6e9ec", mid: "#b9c0c7", dark: "#6f7880", text: "#1f262c" },
  platinum: { light: "#e9edf1", mid: "#c5ccd3", dark: "#7c858e", text: "#1f262c" },
  palladium: { light: "#dfe3e7", mid: "#aeb5bc", dark: "#646c74", text: "#1f262c" },
};

export function ProductImagePlaceholder({
  metal,
  type,
  weightLabel,
  className,
}: {
  metal: Metal;
  type: ProductType;
  weightLabel: string;
  className?: string;
}) {
  const colors = tint[metal];
  const shape = type === "bar" ? "bar" : "coin";
  // Gradient ids must be unique per instance — a page shows many of these.
  const gradientId = `hh-placeholder${useId()}`;
  // Longer labels ("Sold by face value") drop a size so they stay inside the
  // engraved band.
  const fontSize = weightLabel.length > 8 ? 9 : 13;

  return (
    <svg
      viewBox="0 0 124 110"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors.light} />
          <stop offset="0.5" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.dark} />
        </linearGradient>
        <radialGradient id={`${gradientId}-sheen`} cx="0.3" cy="0.25" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="124" height="110" fill="#06150f" />

      {shape === "bar" ? (
        <g>
          <rect
            x="20"
            y="30"
            width="84"
            height="50"
            rx="4"
            fill={`url(#${gradientId})`}
            stroke={colors.dark}
            strokeWidth="1"
          />
          <rect
            x="20"
            y="30"
            width="84"
            height="50"
            rx="4"
            fill={`url(#${gradientId}-sheen)`}
          />
          <rect
            x="27"
            y="37"
            width="70"
            height="36"
            rx="2"
            fill="none"
            stroke={colors.text}
            strokeOpacity="0.35"
            strokeWidth="0.75"
          />
        </g>
      ) : (
        <g>
          <circle
            cx="62"
            cy="55"
            r="40"
            fill={`url(#${gradientId})`}
            stroke={colors.dark}
            strokeWidth="1"
          />
          <circle cx="62" cy="55" r="40" fill={`url(#${gradientId}-sheen)`} />
          <circle
            cx="62"
            cy="55"
            r="34"
            fill="none"
            stroke={colors.text}
            strokeOpacity="0.35"
            strokeWidth="0.75"
          />
          <circle
            cx="62"
            cy="55"
            r="38"
            fill="none"
            stroke={colors.light}
            strokeOpacity="0.5"
            strokeWidth="0.5"
            strokeDasharray="1 1.5"
          />
        </g>
      )}

      <text
        x="62"
        y="55"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-inter), ui-sans-serif, system-ui, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="0.04em"
        fill={colors.text}
        fillOpacity="0.85"
      >
        {weightLabel}
      </text>
    </svg>
  );
}
