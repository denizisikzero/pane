import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookCall } from "@/registry/pane/blocks/landing-01/components/book-call";
import { ContactForm } from "@/registry/pane/blocks/landing-01/components/contact-form";
import { Pricing } from "@/registry/pane/blocks/landing-01/components/pricing";
import {
  clients,
  footer,
  images,
  services,
  steps,
  team,
} from "@/registry/pane/blocks/landing-01/components/studio-data";
import {
  StartProject,
  StudioHeader,
  Wordmark,
} from "@/registry/pane/blocks/landing-01/components/studio-header";
import { ThemedImage } from "@/registry/pane/blocks/landing-01/components/themed-image";
import { Work } from "@/registry/pane/blocks/landing-01/components/work";

/**
 * `asChild` as a spread, not a literal attribute: `shadcn add` rewrites a
 * literal one into a `render` prop for Base UI styles, which these Radix
 * triggers would ignore. See CONTRIBUTING.md.
 */
const asChild = { asChild: true } as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-2xl text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/** What the studio is on right now, on glass in the hero's corner. */
function NowCard() {
  return (
    <Pane
      variant="thick"
      radius={22}
      className="flex w-full max-w-xs flex-col gap-4 p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-sm">In the studio now</span>
        <Badge>
          <SparklesIcon />
          Live
        </Badge>
      </div>
      <p className="text-muted-foreground text-sm">
        Pane, a liquid-glass library for React — shipping weekly.
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Q1 2027 booked</span>
          <span className="tabular-nums">72%</span>
        </div>
        <Progress value={72} aria-label="Q1 2027 booked" />
      </div>
      {/* side by side, not stacked: overlapping glass circles tangle */}
      <div className="flex gap-1">
        {team.slice(0, 4).map((person) => (
          <Avatar key={person.initials} className="size-8">
            <AvatarFallback className="text-xs">
              {person.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Pane>
  );
}

/**
 * The opening screen: a render, edge to edge under the floating navbar, the
 * headline set on a wash of the page's background, a word of glass type
 * and what the studio is working on, on glass in the corner.
 */
function Hero() {
  return (
    // pulled up under the sticky header, so the navbar's glass sits on the
    // render from the first frame
    <section className="-mt-[4.25rem] px-4">
      <div className="relative isolate mx-auto flex min-h-[min(54rem,92svh)] max-w-6xl flex-col justify-end gap-10 overflow-hidden rounded-[calc(28px*var(--pane-radius-scale,1))] p-6 pt-28 sm:p-10 sm:pt-32">
        <ThemedImage
          src={images.hero}
          className="-z-10 absolute inset-0 size-full object-cover object-[78%_45%]"
        />
        {/* a wash in the page's background on the headline's side only, so
            the type reads on every part of the render, light or dark; the
            glass word keeps the bare render */}
        <div
          aria-hidden="true"
          className="-z-10 absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_92%,transparent),color-mix(in_oklab,var(--background)_60%,transparent)_38%,transparent_62%)]"
        />
        <Text
          as="p"
          variant="thick"
          className="absolute top-24 right-6 hidden font-semibold text-[9rem] tracking-tighter sm:right-10 lg:block lg:text-[12rem]"
        >
          calm.
        </Text>
        <div className="flex flex-wrap items-end justify-between gap-8">
          {/* on the wash: the page's own colors, in either theme */}
          <div className="flex max-w-xl flex-col items-start gap-6">
            <Badge variant="prominent" tinted>
              Booking Q1 2027
            </Badge>
            <h1 className="text-balance font-semibold text-5xl tracking-tight sm:text-7xl">
              We design calmer interfaces.
            </h1>
            <p className="max-w-md text-balance text-lg text-muted-foreground">
              A five-person studio for product design, design systems and brand.
              A few teams at a time, start to finish.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StartProject>
                <Button variant="inverted" size="lg">
                  Start a project
                  <ArrowRightIcon />
                </Button>
              </StartProject>
              <BookCall />
            </div>
          </div>
          <div className="hidden md:block">
            <NowCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The site of a small design studio, built with every Pane component: the
 * glass sits where an interface would — the navbar, captions over work,
 * menus, dialogs and the brief — on a plain page with type and renders, and
 * glass type twice: over the hero and in the closing band.
 */
export default function Page() {
  return (
    <div id="top" className="min-h-svh bg-background text-foreground">
      <StudioHeader />
      <Hero />

      <main className="mx-auto flex max-w-6xl flex-col px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-12 font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {clients.map((client) => (
            <span key={client}>{client}</span>
          ))}
        </div>

        <section
          id="work"
          className="flex scroll-mt-24 flex-col gap-10 border-foreground/10 border-t py-20"
        >
          <SectionTitle eyebrow="Selected work" title="Things we've shipped." />
          <Work />
        </section>

        <section
          id="services"
          className="grid scroll-mt-24 gap-10 border-foreground/10 border-t py-20 md:grid-cols-[1fr_1.3fr]"
        >
          <div className="flex flex-col gap-6">
            <SectionTitle eyebrow="Services" title="Four things, done well." />
            <div className="grid gap-5">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <span className="font-mono text-muted-foreground text-xs">
                    {step.step}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">{step.title}</span>
                    <span className="text-muted-foreground text-sm">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Accordion type="single" collapsible defaultValue={services[0].title}>
            {services.map((service) => (
              <AccordionItem key={service.title} value={service.title}>
                <AccordionTrigger>{service.title}</AccordionTrigger>
                <AccordionContent>{service.detail}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section
          id="studio"
          className="flex scroll-mt-24 flex-col gap-10 border-foreground/10 border-t py-20"
        >
          <SectionTitle
            eyebrow="Studio"
            title="Five people, one room, no handoffs."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((person) => (
              <Tooltip key={person.initials}>
                <TooltipTrigger {...asChild}>
                  <button
                    type="button"
                    className="group relative isolate flex aspect-[3/4] items-end overflow-hidden rounded-[calc(20px*var(--pane-radius-scale,1))] p-2.5 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <ThemedImage
                      src={person.image}
                      loading="lazy"
                      style={{ objectPosition: person.position }}
                      className="-z-10 absolute inset-0 size-full scale-125 object-cover transition-transform duration-700 group-hover:scale-[1.32]"
                    />
                    <Pane
                      variant="thick"
                      radius={14}
                      className="w-full px-3 py-2"
                    >
                      <div className="font-medium text-sm">
                        {person.name.split(" ")[0]}
                      </div>
                      <div className="truncate text-muted-foreground text-xs">
                        {person.role}
                      </div>
                    </Pane>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{person.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <Alert className="max-w-2xl">
            <SparklesIcon />
            <AlertTitle>We're hiring a senior product designer</AlertTitle>
            <AlertDescription>
              Remote in Europe, four days a week. Send us three projects you're
              proud of and why.
            </AlertDescription>
          </Alert>
        </section>

        <section
          id="pricing"
          className="flex scroll-mt-24 flex-col gap-10 border-foreground/10 border-t py-20"
        >
          <SectionTitle
            eyebrow="Engagements"
            title="Fixed scope, or a team on call."
          />
          <Pricing />
        </section>

        <section className="flex flex-col items-center gap-6 border-foreground/10 border-t py-24 text-center">
          <blockquote className="max-w-2xl text-balance font-medium text-2xl leading-snug tracking-tight sm:text-3xl">
            “They shipped a design system our engineers actually use. Six months
            later we still haven't forked it.”
          </blockquote>
          <div className="flex items-center gap-3 text-sm">
            <Avatar className="size-8">
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <span className="font-medium">Olivia Martin</span>
            <span className="text-muted-foreground">Head of Design, Lumen</span>
          </div>
        </section>

        <section
          id="contact"
          className="grid scroll-mt-24 items-center gap-10 border-foreground/10 border-t py-20 lg:grid-cols-[1fr_30rem]"
        >
          <div className="flex flex-col gap-4">
            <SectionTitle
              eyebrow="Contact"
              title="Tell us what you're building."
            />
            <p className="max-w-sm text-muted-foreground">
              A few lines is plenty. We read every brief and reply within a
              working day.
            </p>
          </div>
          <div className="relative isolate overflow-hidden rounded-[calc(28px*var(--pane-radius-scale,1))] p-3 sm:p-5">
            <ThemedImage
              src={images.contact}
              loading="lazy"
              className="-z-10 absolute inset-0 size-full object-cover"
            />
            <Pane variant="thick" radius={24} className="p-6">
              <ContactForm id="page" />
            </Pane>
          </div>
        </section>
      </main>

      <section
        className="mx-auto mt-20 max-w-6xl px-4"
        aria-label="theui.company"
      >
        <div className="relative isolate flex h-56 items-center justify-center overflow-hidden rounded-[calc(28px*var(--pane-radius-scale,1))] sm:h-80">
          <ThemedImage
            src={images.closing}
            loading="lazy"
            className="-z-10 absolute inset-0 size-full object-cover object-[50%_40%]"
          />
          <Text
            variant="thick"
            className="font-semibold text-[22vw] tracking-tighter sm:text-[13rem]"
          >
            theui
          </Text>
        </div>
      </section>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-col gap-12 border-foreground/10 border-t px-4 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-xs text-muted-foreground text-sm">
              A design studio for calmer interfaces. One email a month, about
              what we learned.
            </p>
            <form className="flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          {footer.map((column) => (
            <div key={column.title} className="flex flex-col gap-3 text-sm">
              <span className="font-medium">{column.title}</span>
              {column.links.map((link) => (
                <a
                  key={link}
                  href="#top"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-2 text-muted-foreground text-xs sm:flex-row">
          <span>© 2026 theui.company</span>
          <span>Built with Pane</span>
        </div>
      </footer>
    </div>
  );
}
