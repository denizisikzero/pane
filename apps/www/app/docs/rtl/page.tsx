import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { Surface } from "@/components/surface";
import {
  rtlExample,
  rtlFlips,
  rtlIntro,
  rtlNotes,
  rtlSetup,
} from "@/lib/docs-content";
import { pageMetadata } from "@/lib/seo";
import RtlDemo from "@/registry/pane/examples/rtl-demo";
import RtlMenu from "@/registry/pane/examples/rtl-menu";

export const metadata: Metadata = pageMetadata({
  title: "RTL",
  description:
    "Pane in right-to-left languages: set the direction once and every component mirrors, from paddings to the Sidebar.",
  path: "/docs/rtl",
  markdown: true,
});

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";

/** Docs copy is plain text with `code` spans. */
function Inline({ text }: { text: string }) {
  return text.split(/`([^`]+)`/).map((part, i) =>
    i % 2 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
      <code key={i} className={code}>
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export default function RtlPage() {
  return (
    <div className="flex flex-col gap-14">
      <PageHeader slug={["rtl"]} title="RTL">
        {rtlIntro}
      </PageHeader>

      <ComponentPreview name="rtl-demo" demo={RtlDemo} />

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Set the direction</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Inline text={rtlSetup} />
        </p>
        <CodeBlock lang="tsx" code={rtlExample} />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">What flips</h2>
        <ComponentPreview name="rtl-menu" demo={RtlMenu} compact />
        <Surface radius={20} className="flex flex-col divide-y divide-hairline">
          {rtlFlips.map((flip) => (
            <div
              key={flip.name}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6"
            >
              <span className="shrink-0 font-medium text-sm sm:w-44">
                {flip.name}
              </span>
              <span className="text-muted-foreground text-sm leading-relaxed">
                <Inline text={flip.description} />
              </span>
            </div>
          ))}
        </Surface>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Good to know</h2>
        <ul className="flex list-disc flex-col gap-2 ps-5 text-muted-foreground text-sm leading-relaxed">
          {rtlNotes.map((note) => (
            <li key={note}>
              <Inline text={note} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
