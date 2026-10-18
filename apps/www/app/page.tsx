import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InstallCommand } from "@/components/install-command";
import { ShowcaseBackdrop } from "@/components/showcase-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function ShowcaseCell({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Pane radius={28} className="flex flex-col gap-5 p-6">
      <Link
        href={href}
        className="group flex items-center justify-between text-xs font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        {title}
        <ArrowRightIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="flex min-h-28 flex-1 items-center justify-center">
        {children}
      </div>
    </Pane>
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
            <Button variant="prominent" size="lg" asChild>
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
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ShowcaseCell title="Button" href="/docs/components/button">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button variant="prominent">Continue</Button>
                  <Button variant="destructive">Delete</Button>
                  <Button size="icon" aria-label="Add">
                    <PlusIcon />
                  </Button>
                </div>
              </ShowcaseCell>
              <ShowcaseCell title="Tabs" href="/docs/components/tabs">
                <Tabs defaultValue="music" className="w-full items-center">
                  <TabsList>
                    <TabsTrigger value="music">Music</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="music"
                    className="text-center text-sm text-muted-foreground"
                  >
                    Your library, synced across every device.
                  </TabsContent>
                  <TabsContent
                    value="photos"
                    className="text-center text-sm text-muted-foreground"
                  >
                    Every photo, organized automatically.
                  </TabsContent>
                  <TabsContent
                    value="files"
                    className="text-center text-sm text-muted-foreground"
                  >
                    Documents that stay out of the way.
                  </TabsContent>
                </Tabs>
              </ShowcaseCell>
              <ShowcaseCell title="Input" href="/docs/components/input">
                <div className="flex w-full max-w-xs flex-col gap-3">
                  <Input type="email" placeholder="Email address" />
                  <Input type="password" placeholder="Password" />
                </div>
              </ShowcaseCell>
              <ShowcaseCell title="Switch" href="/docs/components/switch">
                <div className="flex items-center gap-3">
                  <Switch id="home-airplane-mode" defaultChecked />
                  <label
                    htmlFor="home-airplane-mode"
                    className="text-sm font-medium"
                  >
                    Airplane mode
                  </label>
                </div>
              </ShowcaseCell>
              <ShowcaseCell title="Badge" href="/docs/components/badge">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="prominent">New</Badge>
                  <Badge variant="prominent" tinted>
                    Pro
                  </Badge>
                  <Badge>v1.0</Badge>
                </div>
              </ShowcaseCell>
              <ShowcaseCell title="Card" href="/docs/components/card">
                <Card radius={20} className="w-full max-w-xs gap-0 py-4">
                  <CardHeader className="px-4">
                    <CardTitle className="text-sm">Weekly report</CardTitle>
                    <CardDescription>
                      Ready to review and share with the team.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ShowcaseCell>
            </div>
          </ShowcaseBackdrop>
        </section>

        <section className="flex w-full max-w-5xl flex-col items-center gap-10">
          <SectionHeader
            title="Not just a blur"
            sub="Most glass effects stop at a frosted background. Pane goes further, and stays code you own."
          />
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Pane key={title} radius={22} className="flex flex-col gap-3 p-5">
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
                variant="clear"
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
            <Button variant="prominent" size="lg" asChild>
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
