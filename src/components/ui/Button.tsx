import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

/**
 * Figma primary-btn (45:17 / 45:27 / 45:232 / 45:387) and secondary-btn (45:29).
 * Both are 28px/14px padding on an 8px radius; primary carries the gold glow.
 */
const base =
  "inline-flex items-center justify-center rounded-[8px] px-[28px] py-[14px] text-[16px] font-bold transition-colors";

const variants: Record<Variant, string> = {
  primary:
    "bg-hh-gold border border-hh-gold-dark text-hh-green hh-glow hover:bg-[#e3c88a]",
  secondary:
    "border-[1.5px] border-hh-gold-dark text-hh-cream hover:bg-hh-gold-dark/15",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
