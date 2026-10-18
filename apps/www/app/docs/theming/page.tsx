import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { AccentPicker } from "@/components/docs/accent-picker";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { Pane } from "@/components/ui/pane";
import { accentCss, accentNames } from "@/lib/accents";
import { providerExample, tiers, tokenGroups } from "@/lib/docs-content";
import {
  getGlassSource,
  getStyleCssVars,
  getStyleTokens,
} from "@/lib/registry-source";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Customize the Pane glass material with CSS variables and the glass configuration.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";

/**
 * Each value sits on its own theme's background, over a checkerboard so the
 * alpha reads as alpha: a light-mode tint is shown on light, a dark one on dark.
 */
const swatchBase: Record<"light" | "dark", CSSProperties> = {
  light: {
    backgroundColor: "#f5f5f7",
    backgroundImage:
      "conic-gradient(rgb(0 0 0 / 0.1) 25%, transparent 0 50%, rgb(0 0 0 / 0.1) 0 75%, transparent 0)",
    backgroundSize: "8px 8px",
  },
  dark: {
    backgroundColor: "#1c1c1e",
    backgroundImage:
      "conic-gradient(rgb(255 255 255 / 0.1) 25%, transparent 0 50%, rgb(255 255 255 / 0.1) 0 75%, transparent 0)",
    backgroundSize: "8px 8px",
  },
};

function TokenValue({
  scheme,
  value,
}: {
  scheme: "light" | "dark";
  value: string;
}) {
  const isColor = /^(rgb|#|oklch|hsl)/.test(value);
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="w-9 font-sans text-muted-foreground capitalize">
        {scheme}
      </span>
      {isColor ? (
        <span
          className="size-4 shrink-0 overflow-hidden rounded-[5px] ring-1 ring-foreground/10"
          style={swatchBase[scheme]}
        >
          <span className="block size-full" style={{ background: value }} />
        </span>
      ) : null}
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default function ThemingPage() {
  const { light, dark } = getStyleTokens();
  const described = new Set(tokenGroups.flatMap((g) => Object.keys(g.tokens)));
  const other = Object.keys(light).filter((name) => !described.has(name));
  const allGroups = other.length
    ? [
        ...tokenGroups,
        {
          title: "Other",
          tokens: Object.fromEntries(other.map((name) => [name, ""])),
        },
      ]
    : tokenGroups;

  return (
    <div className="flex flex-col gap-12">
      <PageHeader slug={["theming"]} title="Theming">
        The glass is driven by CSS variables and one config file. Change them
        once and every component built on{" "}
        <code className="text-foreground">{"<Pane>"}</code> follows.
      </PageHeader>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Glass tokens</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Installation adds these <code className={code}>--pane-*</code>{" "}
          variables to the stylesheet set in{" "}
          <code className={code}>components.json</code>, usually{" "}
          <code className={code}>app/globals.css</code>. Light values live on{" "}
          <code className={code}>:root</code>, and{" "}
          <code className={code}>.dark</code> overrides them in dark mode. Focus
          rings use your theme&apos;s <code className={code}>--ring</code>, as
          shadcn/ui components do.
        </p>

        {allGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">{group.title}</h3>
            <Pane radius={20} className="flex flex-col">
              {Object.entries(group.tokens).map(([name, description]) => (
                <div
                  key={name}
                  className="flex flex-col gap-3 border-foreground/5 border-t px-5 py-4 first:border-t-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <code className="font-mono text-[13px] text-foreground">
                      --{name}
                    </code>
                    {description ? (
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-col gap-1.5 sm:w-64">
                    <TokenValue scheme="light" value={light[name] ?? "—"} />
                    <TokenValue
                      scheme="dark"
                      value={dark[name] ?? light[name] ?? "—"}
                    />
                  </div>
                </div>
              ))}
            </Pane>
          </div>
        ))}

        <details className="group">
          <summary className="w-fit cursor-pointer text-sm font-medium underline-offset-4 hover:underline">
            Show the full CSS
          </summary>
          <div className="mt-3">
            <CodeBlock lang="css" code={getStyleCssVars()} />
          </div>
        </details>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Accent color</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          One color fills the prominent Button and every control that is on.
          Pick one below and paste the variables over the ones in your
          stylesheet, or set them to any color:{" "}
          <code className={code}>var(--primary)</code> and{" "}
          <code className={code}>var(--primary-foreground)</code> follow your
          shadcn/ui theme. <code className={code}>--pane-accent-text</code> is a
          deeper shade for labels on plain glass, so the bright accent still
          reads as text. Set them on an element instead of{" "}
          <code className={code}>:root</code> to recolor just that part of the
          page.
        </p>
        <AccentPicker
          snippets={Object.fromEntries(
            accentNames.map((name) => [
              name,
              <CodeBlock key={name} lang="css" code={accentCss(name)} />,
            ]),
          )}
        />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Refraction and springs</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Anything that feeds the SVG refraction filter or the spring physics
          has to live in JS, in{" "}
          <code className={code}>lib/glass/config.ts</code>. Open it for more or
          less lensing, a stronger chromatic edge, or snappier or softer press
          feedback.
        </p>
        <CodeBlock lang="tsx" code={getGlassSource("config")} />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Overrides for one section</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          To change the springs or the refraction for part of a page only, wrap
          it in <code className={code}>GlassConfigProvider</code>. It merges
          onto the values above, so pass just what differs. Try values live in
          the{" "}
          <Link
            href="/playground"
            className="font-medium text-foreground underline underline-offset-4"
          >
            playground
          </Link>
          .
        </p>
        <CodeBlock lang="tsx" code={providerExample} />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Quality tiers</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <code className={code}>use-glass-support</code> checks what the
          browser can do, honors{" "}
          <code className={code}>prefers-reduced-transparency</code>, and picks
          one of three tiers. Nothing to configure — it&apos;s automatic.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Pane
              key={tier.name}
              radius={20}
              className="flex flex-col gap-2 p-5"
            >
              <code className="w-fit font-mono font-medium text-sm">
                {tier.name}
              </code>
              <p className="text-xs text-muted-foreground">{tier.who}</p>
              <p className="text-sm">{tier.description}</p>
            </Pane>
          ))}
        </div>
      </section>
    </div>
  );
}
