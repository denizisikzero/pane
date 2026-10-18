import { BlocksIcon, DownloadIcon, PaletteIcon } from "lucide-react";
import type { Metadata } from "next";
import { ComponentPreview } from "@/components/docs/component-preview";
import { LinkCard } from "@/components/docs/link-card";
import { PageHeader } from "@/components/docs/page-header";
import { Pane } from "@/components/ui/pane";
import { componentsMeta } from "@/lib/components-meta";
import { features } from "@/lib/features";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Introduction",
  description: siteConfig.description,
};

export default function DocsIntroductionPage() {
  const pane = componentsMeta.find((component) => component.slug === "pane");

  return (
    <div className="flex flex-col gap-12">
      <PageHeader slug={[]} title="Introduction">
        {siteConfig.name} is a set of liquid-glass components for React,
        distributed as a shadcn registry. Every one of them is built on a single
        primitive, <code className="text-foreground">{"<Pane>"}</code>, so they
        refract, tint and respond as one material.
      </PageHeader>

      {pane ? (
        <ComponentPreview name={`${pane.registryName}-demo`} demo={pane.demo} />
      ) : null}

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">What makes it glass</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Pane key={title} radius={20} className="flex flex-col gap-3 p-5">
              <Icon className="size-5 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Pane>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Next steps</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <LinkCard
            href="/docs/installation"
            icon={DownloadIcon}
            title="Installation"
            description="Add your first component with the shadcn CLI."
          />
          <LinkCard
            href="/docs/theming"
            icon={PaletteIcon}
            title="Theming"
            description="Tune tint, blur, refraction and springs."
          />
          <LinkCard
            href="/docs/components"
            icon={BlocksIcon}
            title="Components"
            description={`Browse all ${componentsMeta.length} with live previews.`}
          />
        </div>
      </section>
    </div>
  );
}
