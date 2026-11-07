import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Text } from "@/components/ui/text";
import { BookCall } from "@/registry/pane/blocks/landing-01/components/book-call";
import { ContactForm } from "@/registry/pane/blocks/landing-01/components/contact-form";
import { Pricing } from "@/registry/pane/blocks/landing-01/components/pricing";
import {
  clients,
  footer,
  images,
  services,
  steps,
} from "@/registry/pane/blocks/landing-01/components/studio-data";
import {
  StartProject,
  StudioHeader,
  Wordmark,
} from "@/registry/pane/blocks/landing-01/components/studio-header";
import { ThemedImage } from "@/registry/pane/blocks/landing-01/components/themed-image";
import { Work } from "@/registry/pane/blocks/landing-01/components/work";

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

/**
 * The opening screen: the pitch in plain type on the page, where it reads
 * first, then a wide, calm render with one word cut from glass across it.
 */
function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 pt-20 sm:pt-28">
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="prominent" tinted>
          Booking Q1 2027
        </Badge>
        <h1 className="text-balance font-semibold text-5xl tracking-tight sm:text-7xl">
          We design calmer interfaces.
        </h1>
        <p className="max-w-xl text-balance text-lg text-muted-foreground">
          A five-person studio for product design, design systems and brand. A
          few teams at a time, start to finish.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <StartProject>
            <Button variant="inverted" size="lg">
              Start a project
              <ArrowRightIcon />
            </Button>
          </StartProject>
          <BookCall />
        </div>
      </div>
      <div className="relative isolate flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[calc(28px*var(--pane-radius-scale,1))] sm:aspect-[16/7]">
        <ThemedImage
          src={images.hero}
          className="-z-10 absolute inset-0 size-full object-cover object-[50%_60%]"
        />
        {/* one word, sized to the frame: glass lines don't wrap */}
        <Text
          as="p"
          variant="thick"
          className="font-semibold text-[26vw] leading-none tracking-tighter lg:text-[16rem]"
        >
          calm.
        </Text>
      </div>
    </section>
  );
}

/**
 * The site of Acme, a made-up design studio, built with Pane: the glass sits
 * where an interface would — the navbar, captions over work, menus, dialogs
 * and the brief — on a plain page with type and renders, and one word cut
 * from glass over the hero's render.
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

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col gap-12 border-foreground/10 border-t px-4 pt-14 pb-10">
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
                placeholder="you@example.com"
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
          <span>© 2026 Acme Inc.</span>
          <span>Built with Pane</span>
        </div>
      </footer>
    </div>
  );
}
