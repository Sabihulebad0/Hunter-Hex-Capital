import { cn } from "@/lib/utils";

/** Gold pill used above every section title — Figma section-badge (45:22 et al). */
export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-[100px] border border-hh-gold-dark bg-hh-deep px-4 py-1.5 text-[12px] font-bold uppercase text-hh-gold">
      {children}
    </span>
  );
}

/**
 * Badge + 40px title block. `align="center"` matches the products, services,
 * gallery, testimonials and FAQ headers; `left` matches the About section.
 */
export function SectionHeading({
  badge,
  title,
  align = "center",
  className,
  id,
}: {
  badge: string;
  title: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2
        id={id}
        className="text-[28px] font-bold text-hh-cream sm:text-[32px] lg:text-[40px]"
      >
        {title}
      </h2>
    </div>
  );
}
