"use client";

import { MenuIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import { GitHubIcon } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { docsNav, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const sections = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Playground", href: "/playground" },
];

const themes = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
] as const;

/** Which top-level section a path is in: components own their subtree. */
function sectionOf(pathname: string) {
  if (pathname.startsWith("/docs/components")) return "/docs/components";
  if (pathname.startsWith("/docs")) return "/docs";
  if (pathname.startsWith("/playground")) return "/playground";
  return "/";
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow px-3">{children}</span>;
}

/**
 * The whole site on a phone, in one sheet: the four sections, the guides,
 * every component in two columns so the list stays short, and GitHub and the
 * theme at the bottom — the header keeps only the wordmark, search and this.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const close = () => setOpen(false);
  const [guides, components] = docsNav;

  const link = (href: string) =>
    cn(
      "rounded-[calc(12px*var(--pane-radius-scale,1))] px-3 py-2 text-sm transition-colors",
      pathname === href
        ? "bg-foreground/[0.07] font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground",
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Open navigation">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-0">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Site"
          className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-2 pb-4"
        >
          <div className="grid grid-cols-2 gap-1">
            {sections.map((section) => {
              const active = sectionOf(pathname) === section.href;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[calc(14px*var(--pane-radius-scale,1))] px-3 py-2.5 font-medium text-sm transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.09]",
                  )}
                >
                  {section.title}
                </Link>
              );
            })}
          </div>

          {guides ? (
            <div className="flex flex-col gap-1">
              <Eyebrow>{guides.title}</Eyebrow>
              <div className="flex flex-col">
                {guides.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={link(item.href)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {components ? (
            <div className="flex flex-col gap-1">
              <Eyebrow>{components.title}</Eyebrow>
              <div className="grid grid-cols-2">
                {components.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(link(item.href), "leading-snug")}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </nav>

        <div className="flex items-center justify-between gap-3 border-hairline border-t px-4 py-3">
          <ToggleGroup
            value={theme ?? "system"}
            onValueChange={(value) => value && setTheme(value)}
            aria-label="Theme"
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                aria-label={label}
                title={label}
              >
                <Icon className="size-4" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button size="icon" variant="ghost" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Pane on GitHub"
            >
              <GitHubIcon />
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
