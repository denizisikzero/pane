import { cn } from "@/lib/utils";

export interface ThemedSrc {
  light: string;
  dark: string;
}

/**
 * A photo in a light and a dark version: CSS shows the one for the theme, so
 * there is no flash and no script. `[.dark_&]` follows the `.dark` class
 * shadcn/ui puts on the page, whatever the project's `dark:` variant is set
 * to.
 */
export function ThemedImage({
  src,
  className,
  style,
  loading,
}: {
  src: ThemedSrc;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
}) {
  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: a plain img keeps the block free of next.config image settings */}
      <img
        src={src.light}
        alt=""
        loading={loading}
        style={style}
        className={cn(className, "[.dark_&]:hidden")}
      />
      {/* biome-ignore lint/performance/noImgElement: a plain img keeps the block free of next.config image settings */}
      <img
        src={src.dark}
        alt=""
        loading="lazy"
        style={style}
        className={cn(className, "hidden [.dark_&]:block")}
      />
    </>
  );
}
