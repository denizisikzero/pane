import { BotIcon, CpuIcon, DownloadIcon, PaletteIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ComponentPreview } from "@/components/docs/component-preview";
import { LinkCard } from "@/components/docs/link-card";
import { PageHeader } from "@/components/docs/page-header";
import { Surface } from "@/components/surface";
import { componentsMeta } from "@/lib/components-meta";
import { introSections } from "@/lib/docs-content";
import { features } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Introduction",
  description:
    "What Pane is: liquid-glass React components on one glass primitive, installed with the shadcn CLI, with three renderers from WebGPU to CSS.",
  path: "/docs",
  markdown: true,
});

const link = "font-medium text-foreground underline underline-offset-4";

export default function DocsIntroductionPage() {
  const pane = componentsMeta.find((component) => component.slug === "pane");

  return (
    <div className="flex flex-col gap-14">
      <PageHeader slug={[]} title="Introduction">
        {siteConfig.name} is an open source library of liquid-glass components
        for React, distributed as a shadcn registry. Every one of them is built
        on a single primitive,{" "}
        <code className="text-foreground">{"<Pane>"}</code>, so they refract,
        tint and respond as one material.
      </PageHeader>

      {pane ? (
        <ComponentPreview name={`${pane.registryName}-demo`} demo={pane.demo} />
      ) : null}

      {introSections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <h2 className="display text-3xl">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          {section.title === "Three renderers" ? (
            <p className="text-muted-foreground leading-relaxed">
              <Link href="/docs/rendering" className={link}>
                Rendering
              </Link>{" "}
              explains each one and how to opt into the WebGPU lens.
            </p>
          ) : null}
        </section>
      ))}

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">What makes it glass</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Surface
              key={title}
              radius={20}
              className="flex flex-col gap-3 p-5"
            >
              <Icon className="size-5 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Next steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <LinkCard
            href="/docs/installation"
            icon={DownloadIcon}
            title="Installation"
            description="Add your first component with the shadcn CLI."
          />
          <LinkCard
            href="/docs/rendering"
            icon={CpuIcon}
            title="Rendering"
            description="The WebGPU lens, SVG refraction and the CSS fallback."
          />
          <LinkCard
            href="/docs/mcp"
            icon={BotIcon}
            title="MCP server"
            description="Let your AI assistant browse and install components."
          />
          <LinkCard
            href="/docs/theming"
            icon={PaletteIcon}
            title="Theming"
            description="The tokens, the accent color and the glass config."
          />
        </div>
      </section>
    </div>
  );
}
