"use client";

import { ArrowUpRightIcon, MailIcon, SearchIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Pane } from "@/components/ui/pane";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactForm } from "@/registry/pane/blocks/landing-01/components/contact-form";
import {
  projects,
  services,
} from "@/registry/pane/blocks/landing-01/components/studio-data";

/**
 * `asChild` as a spread, not a literal attribute: `shadcn add` rewrites a
 * literal one into a `render` prop for Base UI styles, which these Radix
 * triggers would ignore. See CONTRIBUTING.md.
 */
const asChild = { asChild: true } as const;

export function Wordmark() {
  return (
    <a href="#top" className="font-semibold text-lg tracking-tight">
      theui<span className="text-muted-foreground">.company</span>
    </a>
  );
}

/** Search the site from ⌘K: work and services, each a jump to its section. */
function Search() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger {...asChild}>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Search"
            onClick={() => setOpen(true)}
          >
            <SearchIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Search · ⌘K</TooltipContent>
      </Tooltip>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search the studio"
        description="Jump to a project or a service"
      >
        <CommandInput placeholder="Search work and services…" />
        <CommandList>
          <CommandEmpty>Nothing by that name.</CommandEmpty>
          <CommandGroup heading="Work">
            {projects.map((project) => (
              <CommandItem
                key={project.title}
                value={`${project.client} ${project.title}`}
                onSelect={() => go("#work")}
              >
                <ArrowUpRightIcon />
                {project.title}
                <CommandShortcut>{project.client}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Services">
            {services.map((service) => (
              <CommandItem
                key={service.title}
                value={service.title}
                onSelect={() => go("#services")}
              >
                <ArrowUpRightIcon />
                {service.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Contact">
            <CommandItem
              value="Start a project"
              onSelect={() => go("#contact")}
            >
              <MailIcon />
              Start a project
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

/** The project brief in a side sheet, from anywhere on the page. */
export function StartProject({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger {...asChild}>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Start a project</SheetTitle>
          <SheetDescription>
            A few lines is plenty. A person replies within a day.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-6">
          <ContactForm id="sheet" onSent={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-3">
      <Pane
        variant="thick"
        radius={999}
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 pr-2 pl-5"
      >
        <Wordmark />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#work"
                className={navigationMenuTriggerStyle()}
              >
                Work
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[28rem] grid-cols-2 gap-1">
                  {services.map((service) => (
                    <li key={service.title}>
                      <NavigationMenuLink href={service.href}>
                        <div className="font-medium">{service.title}</div>
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#studio"
                className={navigationMenuTriggerStyle()}
              >
                Studio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#pricing"
                className={navigationMenuTriggerStyle()}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-1.5">
          <Search />
          <StartProject>
            <Button variant="inverted" size="sm">
              Start a project
            </Button>
          </StartProject>
        </div>
      </Pane>
    </header>
  );
}
