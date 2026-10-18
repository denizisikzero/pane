"use client";

import { useCommandState } from "cmdk";
import {
  ArrowRightIcon,
  BlocksIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { docsNav } from "@/lib/site-config";

const installCommand = (name: string) => `npx shadcn@latest add @pane/${name}`;

/**
 * cmdk matches on an item's value, so values are just the titles: anything
 * extra (descriptions, prefixes) feeds its fuzzy match and drags unrelated
 * items above the one you typed. The footer maps the title back to a name.
 */
// titles and links come from the nav: components-meta would pull every
// demo into this bundle, which ships with the header on every page
const components =
  docsNav.find((group) => group.title === "Components")?.items ?? [];
const componentByTitle = new Map(
  components.map((item) => [
    item.title.toLowerCase(),
    item.href.split("/").pop() ?? "",
  ]),
);

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-foreground/[0.07] px-1 font-sans text-[11px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

/**
 * Hints along the bottom of the palette. Reads the highlighted item from
 * cmdk, and on a component also offers ⌘C to copy its install command.
 */
function Footer({ mod }: { mod: string }) {
  const value = useCommandState((state) => state.value);
  const name = value
    ? (componentByTitle.get(value.toLowerCase()) ?? null)
    : null;
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!name) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "c" && (event.metaKey || event.ctrlKey)) {
        // leave a real text selection alone
        if (window.getSelection()?.toString()) return;
        event.preventDefault();
        navigator.clipboard.writeText(installCommand(name));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [name]);

  return (
    <div className="flex h-11 items-center gap-4 border-foreground/10 border-t px-4 text-muted-foreground text-xs">
      <span className="flex items-center gap-1.5">
        <Kbd>↵</Kbd> Go to page
      </span>
      {name ? (
        <span className="flex items-center gap-1.5">
          <Kbd>{mod}</Kbd>
          <Kbd>C</Kbd>
          {copied ? "Copied" : "Copy install command"}
        </span>
      ) : null}
    </div>
  );
}

export function CommandMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mod, setMod] = React.useState("⌘");

  React.useEffect(() => {
    // the platform is only known on the client
    if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) setMod("Ctrl");

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        event.key === "/"
      ) {
        const target = event.target;
        // typing in a field: "/" is a character there, not a shortcut
        if (
          (target instanceof HTMLElement && target.isContentEditable) ||
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return;
        }
        event.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="w-9 justify-center px-0 font-normal text-muted-foreground lg:w-52 lg:justify-between lg:px-3"
      >
        <span className="flex items-center gap-2">
          <SearchIcon />
          <span className="hidden lg:inline">Search docs...</span>
        </span>
        <span className="hidden items-center gap-0.5 lg:flex">
          <Kbd>{mod}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search pages and components, or switch the theme."
        showCloseButton={false}
      >
        <CommandInput placeholder="Search documentation..." />
        <CommandList className="max-h-[min(60vh,420px)]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Getting started">
            {docsNav[0]?.items.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => run(() => router.push(item.href))}
              >
                <ArrowRightIcon />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {components.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => run(() => router.push(item.href))}
              >
                <BlocksIcon />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Theme">
            <CommandItem
              value="Light theme"
              onSelect={() => run(() => setTheme("light"))}
            >
              <SunIcon />
              Light
            </CommandItem>
            <CommandItem
              value="Dark theme"
              onSelect={() => run(() => setTheme("dark"))}
            >
              <MoonIcon />
              Dark
            </CommandItem>
            <CommandItem
              value="System theme"
              onSelect={() => run(() => setTheme("system"))}
            >
              <MonitorIcon />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <Footer mod={mod} />
      </CommandDialog>
    </>
  );
}
