import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/docs/page-header";
import { Pane } from "@/components/ui/pane";
import { componentsMeta } from "@/lib/components-meta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Components",
  description: "All available liquid-glass components.",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader slug={["components"]} title="Components">
        {componentsMeta.length} liquid-glass components, all built on the same{" "}
        {siteConfig.name} primitive.
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {componentsMeta.map(({ slug, title, description, demo: Demo }) => (
          <Pane
            variant="blur"
            key={slug}
            radius={24}
            className="group relative flex flex-col"
          >
            {/* the demo is a picture here, not a control: inert keeps it out
                of the tab order and lets the whole card act as one link */}
            <div
              inert
              className="flex h-56 items-center justify-center overflow-hidden px-4"
            >
              <div className="pointer-events-none flex w-[calc(100%/0.7)] shrink-0 origin-center scale-[0.7] justify-center">
                <Demo />
              </div>
            </div>
            <div className="flex flex-col gap-1 border-foreground/5 border-t p-5">
              <h2 className="flex items-center justify-between font-medium">
                {title}
                <ArrowRightIcon className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <Link
              href={`/docs/components/${slug}`}
              aria-label={title}
              className="absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset"
            />
          </Pane>
        ))}
      </div>
    </div>
  );
}
