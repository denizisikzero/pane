import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InstallCommand } from "@/components/install-command";
import { ShowcaseBackdrop } from "@/components/showcase-backdrop";
import { ShowcaseGrid } from "@/components/showcase-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pane } from "@/components/ui/pane";
import { componentsMeta } from "@/lib/components-meta";
import { features } from "@/lib/features";
import { siteConfig } from "@/lib/site-config";
import packageJson from "../package.json";

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex max-w-xl flex-col items-center gap-3 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      <p className="text-balance text-muted-foreground">{sub}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center gap-20 px-4 pt-12 pb-24 sm:gap-28 sm:pt-20 sm:pb-32">
        <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge asChild>
            <Link
              href="/docs/changelog"
              className="transition-opacity hover:opacity-80"
            >
              v{packageJson.version}
            </Link>
          </Badge>
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Liquid glass, for React.
          </h1>
          <p className="max-w-xl text-lg text-balance text-muted-foreground">
            A component registry that recreates Apple&apos;s liquid glass
            material — real refraction, pointer-reactive light, spring physics.
            Install with the shadcn CLI or copy the code.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button variant="inverted" size="lg" asChild>
              <Link href="/docs">Get started</Link>
            </Button>
            <InstallCommand />
          </div>
          <p className="text-xs text-muted-foreground">
            <Link
              href="/docs/components"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              {componentsMeta.length} components
            </Link>{" "}
            ·{" "}
            <a
              href={`${siteConfig.links.github}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              MIT licensed
            </a>{" "}
            · React 19 + Tailwind v4
          </p>
        </section>

        <section className="flex w-full max-w-5xl flex-col items-center gap-10">
          <SectionHeader
            title="One material, every component"
            sub="Everything is built on a single <Pane> primitive, so buttons, inputs and dialogs refract, tint and respond as one surface. Try them — they're live."
          />
          <ShowcaseBackdrop>
            <ShowcaseGrid />
          </ShowcaseBackdrop>
        </section>

        <section className="flex w-full max-w-5xl flex-col items-center gap-10">
          <SectionHeader
            title="Not just a blur"
            sub="Most glass effects stop at a frosted background. Pane goes further, and stays code you own."
          />
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Pane
                variant="blur"
                key={title}
                radius={22}
                className="flex flex-col gap-3 p-5"
              >
                <Icon className="size-5 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </Pane>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-3xl flex-col items-center gap-10">
          <SectionHeader
            title={`${componentsMeta.length} components, one command away`}
            sub="Each one has a live preview, the full source and its install command."
          />
          <div className="flex flex-wrap justify-center gap-2.5">
            {componentsMeta.map((component) => (
              <Pane
                key={component.slug}
                radius={999}
                interactive
                className="inline-flex"
              >
                <Link
                  href={`/docs/components/${component.slug}`}
                  className="px-4 py-2 text-sm font-medium"
                >
                  {component.title}
                </Link>
              </Pane>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button variant="inverted" size="lg" asChild>
              <Link href="/docs/components">
                Browse components
                <ArrowRightIcon />
              </Link>
            </Button>
            <InstallCommand />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
