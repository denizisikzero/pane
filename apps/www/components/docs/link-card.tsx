import { ArrowRightIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Pane } from "@/components/ui/pane";

/** A glass card that links somewhere as a whole. */
export function LinkCard({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Pane
      variant="blur"
      radius={20}
      className="group relative flex flex-col gap-3 p-5"
    >
      <Icon className="size-5 text-muted-foreground" />
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center justify-between font-medium">
          {title}
          <ArrowRightIcon className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Link
        href={href}
        aria-label={title}
        className="absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset"
      />
    </Pane>
  );
}
