import type { Metadata } from "next";
import Link from "next/link";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { componentsMeta } from "@/lib/components-meta";
import { introSections } from "@/lib/docs-content";
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
    </div>
  );
}
