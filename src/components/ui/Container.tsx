import { cn } from "@/lib/utils";

/**
 * Figma lays every section out on a 1440px frame with 80px gutters, giving a
 * 1280px content column. Below that the gutters step down so nothing clips.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-[80px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
