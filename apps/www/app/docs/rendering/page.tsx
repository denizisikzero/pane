import { DownloadIcon, PaletteIcon } from "lucide-react";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { LinkCard } from "@/components/docs/link-card";
import { PageHeader } from "@/components/docs/page-header";
import { Surface } from "@/components/surface";
import { renderers, sceneExample, tiers } from "@/lib/docs-content";

export const metadata: Metadata = {
  title: "Rendering",
  description:
    "How Pane draws its glass: the WebGPU lens inside a GlassScene, SVG refraction in Chromium, and the CSS fallback — and how to tune each one.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";

const rows: { label: string; key: keyof (typeof renderers)[number] }[] = [
  { label: "Used", key: "where" },
  { label: "Browsers", key: "browsers" },
  { label: "Refraction", key: "refraction" },
  { label: "Bends", key: "source" },
  { label: "Cost", key: "cost" },
];

export default function RenderingPage() {
  return (
    <div className="flex flex-col gap-14">
      <PageHeader slug={["rendering"]} title="Rendering">
        One material, three ways to draw it. Every component has the same props
        and looks the same in all of them; Pane picks the best one the browser
        can do, and you choose where the WebGPU lens runs.
      </PageHeader>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Choosing a renderer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You don&apos;t pick per component. Outside a{" "}
          <code className={code}>GlassScene</code> a pane uses SVG refraction
          where the browser supports it and CSS glass where it doesn&apos;t;
          inside one, it draws with the WebGPU lens.
        </p>
        <Surface radius={20} className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr>
                <th className="w-28 px-5 py-4" />
                {renderers.map((r) => (
                  <th key={r.name} className="px-5 py-4 font-medium">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-hairline border-t">
                  <td className="px-5 py-3.5 align-top text-muted-foreground">
                    {row.label}
                  </td>
                  {renderers.map((r) => (
                    <td key={r.name} className="px-5 py-3.5 align-top">
                      {r[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">The WebGPU lens</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Wrap a section in <code className={code}>GlassScene</code> and give it
          the video, image or canvas behind it. Every Pane inside then draws its
          glass in a WebGPU shader: the rim bends the backdrop like a real lens,
          splits it into a faint color fringe and catches the light — in any
          browser with WebGPU, Safari and Firefox included.
        </p>
        <CodeBlock lang="tsx" code={sceneExample} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          WebGPU can&apos;t see what the browser painted, so the lens bends only
          that source: text or other elements between it and a pane aren&apos;t
          refracted. Outside a scene, without WebGPU, or until the source has
          loaded, panes keep the glass described below.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">SVG refraction</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Everywhere else in Chromium, each pane builds a displacement map for
          its exact size and corner radius and runs the backdrop through an SVG
          filter, so the rim warps whatever the page painted behind it. Panes
          too small to show it skip the filter, and a pane inside another pane
          swaps to a flat tint — glass can&apos;t stack.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Quality tiers</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <code className={code}>use-glass-support</code> checks what the
          browser can do, honors{" "}
          <code className={code}>prefers-reduced-transparency</code>, and picks
          one of three tiers. Nothing to configure — it&apos;s automatic.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Surface
              key={tier.name}
              radius={20}
              className="flex flex-col gap-2 p-5"
            >
              <code className="w-fit font-medium font-mono text-sm">
                {tier.name}
              </code>
              <p className="text-muted-foreground text-xs">{tier.who}</p>
              <p className="text-sm">{tier.description}</p>
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
            description="Pick a look and add your first component."
          />
          <LinkCard
            href="/docs/theming"
            icon={PaletteIcon}
            title="Theming"
            description="Tokens, the accent color, and the refraction and spring config."
          />
        </div>
      </section>
    </div>
  );
}
