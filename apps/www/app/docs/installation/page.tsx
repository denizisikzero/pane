import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { PreviewSurface } from "@/components/docs/preview-surface";
import { Step, Steps } from "@/components/docs/steps";
import { Surface } from "@/components/surface";
import { Pane } from "@/components/ui/pane";
import { installUsage, requirements } from "@/lib/docs-content";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({
  title: "Installation",
  description:
    "Install Pane in four steps: set up shadcn/ui, set the look, add a component with the @pane namespace, use it.",
  path: "/docs/installation",
  markdown: true,
});

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";
const link = "font-medium text-foreground underline underline-offset-4";

export default function InstallationPage() {
  return (
    <div className="flex flex-col gap-14">
      <PageHeader slug={["installation"]} title="Installation">
        Four steps from an empty project to glass on the page. Pane ships as a
        shadcn registry, so the code lands in your project and stays yours.
      </PageHeader>

      <PreviewSurface>
        <Pane variant="thick" radius={28} className="px-10 py-8">
          <span className="display text-5xl sm:text-6xl">Hello, world!</span>
        </Pane>
      </PreviewSurface>

      <Steps>
        <Step number={1} title="Set up shadcn/ui">
          <p className="text-sm text-muted-foreground">
            Skip this if your project already has a{" "}
            <code className={code}>components.json</code>. Otherwise initialize
            shadcn in it first:
          </p>
          <CodeBlock lang="bash" code="npx shadcn@latest init" />
        </Step>
        <Step number={2} title="Set the look">
          <p className="text-sm text-muted-foreground">
            Pick a border, an accent, a radius and a density in the{" "}
            <Link href="/playground" className={link}>
              playground
            </Link>{" "}
            and run the command it gives you. Skip it to keep the default glass:
            the first component you add brings that along.
          </p>
          <CodeBlock
            lang="bash"
            code="npx shadcn@latest add @pane/styles/glow-green-round-thin"
          />
        </Step>
        <Step number={3} title="Add a component">
          <CodeBlock lang="bash" code="npx shadcn@latest add @pane/button" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Swap <code className={code}>button</code> for any name from the{" "}
            <Link href="/docs/components" className={link}>
              components
            </Link>{" "}
            list, or a whole page from the{" "}
            <Link href="/playground" className={link}>
              playground
            </Link>
            . Dependencies come along automatically: the{" "}
            <code className={code}>Pane</code> primitive, the glass engine, and
            the <code className={code}>--pane-*</code> variables in your{" "}
            <code className={code}>globals.css</code>.
          </p>
        </Step>
        <Step number={4} title="Use it">
          <CodeBlock lang="tsx" code={installUsage} />
          <p className="text-sm text-muted-foreground">
            Glass shows best over something colorful: a photo, a video or a
            gradient behind it. For real lensing over a video, see{" "}
            <Link href="/docs/rendering" className={link}>
              Rendering
            </Link>
            .
          </p>
        </Step>
      </Steps>

      <Callout title="Already using shadcn/ui?">
        Pane components install into{" "}
        <code className={code}>components/ui/</code> under their own names, so
        adding <code className={code}>@pane/button</code> to a project that has
        the shadcn <code className={code}>button</code> asks to overwrite it.
        Keep both by pointing the <code className={code}>ui</code> alias
        elsewhere, or rename the file after install.
      </Callout>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Requirements</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {requirements.map(({ icon: Icon, title, description }) => (
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
    </div>
  );
}
