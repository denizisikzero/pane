import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroStage } from "@/components/home/hero-stage";
import { PhotoTiles } from "@/components/home/photo-tiles";
import { InstallCommand } from "@/components/install-command";
import { Button } from "@/components/ui/button";
import { componentsMeta } from "@/lib/components-meta";
import { pageMetadata } from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import packageJson from "../package.json";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} · ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const next = [
  {
    title: "Docs",
    description: "Install, pick a look, learn how it renders.",
    href: "/docs",
  },
  {
    title: "Components",
    description: `All ${componentsMeta.length}, with live previews.`,
    href: "/docs/components",
  },
  {
    title: "Playground",
    description: "Pick a look and see every component take it.",
    href: "/playground",
  },
];

/** Structured data: the site, and the library as open-source code. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getSiteUrl(),
      description: siteConfig.description,
    },
    {
      "@type": "SoftwareSourceCode",
      name: siteConfig.name,
      description: siteConfig.description,
      url: getSiteUrl(),
      codeRepository: siteConfig.links.github,
      programmingLanguage: ["TypeScript", "React"],
      runtimePlatform: "Web browser",
      license: "https://opensource.org/licenses/MIT",
      version: packageJson.version,
      author: {
        "@type": "Person",
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: our own static JSON; `<` escaped so it can't close the script tag
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-28 px-4 pt-16 sm:gap-36 sm:pt-24">
        <section className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-6 text-center">
            <Link
              href="/docs/changelog"
              className="text-muted-foreground text-sm underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              v{packageJson.version} · {componentsMeta.length} components
            </Link>
            <h1 className="display max-w-3xl text-balance text-6xl sm:text-8xl">
              Liquid glass, <em>ready to ship.</em>
            </h1>
            <p className="max-w-lg text-balance text-lg text-muted-foreground">
              Liquid-glass components for React that bend the light behind them.
              Installed with the shadcn CLI, owned by you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="inverted" size="lg">
                <Link href="/docs/installation">
                  Get started
                  <ArrowRightIcon />
                </Link>
              </Button>
              <InstallCommand command="npx shadcn@latest add @pane/button" />
            </div>
          </div>
          <div className="w-full">
            <HeroStage />
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="display text-5xl sm:text-6xl">
              Glass over <em>anything.</em>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Put it on a photo, a video or a gradient — every piece below is a
              live component. Press it, drag it, switch it.
            </p>
          </div>
          <PhotoTiles />
        </section>

        <section className="grid border-hairline border-t sm:grid-cols-3">
          {next.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-2 border-hairline border-b py-8 sm:border-b-0 sm:px-6 sm:not-first:border-l sm:first:pl-0"
            >
              <span className="flex items-center justify-between">
                <span className="display text-4xl">{item.title}</span>
                <ArrowRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </span>
              <span className="text-muted-foreground text-sm">
                {item.description}
              </span>
            </Link>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
