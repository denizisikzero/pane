import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Playground } from "@/components/playground/playground";
import { componentsMeta } from "@/lib/components-meta";
import { getBlockFiles } from "@/lib/registry-source";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Playground",
  description:
    "Tune liquid glass live: accent, border, radius, density, refraction and springs, on a design studio's site and every Pane component at once — then copy one install line.",
  path: "/playground",
});

export default function PlaygroundPage() {
  const files = getBlockFiles("landing-01").map((file) => ({
    name: file.path.split("/").pop() ?? file.path,
    code: file.code,
    node: <CodeBlock key={file.path} code={file.code} showLineNumbers bare />,
  }));

  // the components the look shows on; the sidebar needs a whole page, and
  // the rest are lists, toasts and menus that read better on their own pages
  const skip = new Set([
    "sidebar",
    "avatar",
    "accordion",
    "sonner",
    "command",
    "navigation-menu",
  ]);
  const components = componentsMeta
    .filter((meta) => !skip.has(meta.slug))
    .map((meta) => ({
      slug: meta.slug,
      title: meta.title,
      node: <meta.demo key={meta.slug} />,
    }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 pt-14 pb-24">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Playground</span>
          <h1 className="display max-w-3xl text-balance text-5xl sm:text-7xl">
            Pick your glass, <em>see it everywhere.</em>
          </h1>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground">
            Tune the look on the left and copy one install line. The preview is
            a design studio&apos;s site built with every Pane component — check
            it on a phone, read its code, and see each component on its own
            below.
          </p>
        </div>
        <Playground files={files} components={components} />
      </main>
      <Footer />
    </div>
  );
}
