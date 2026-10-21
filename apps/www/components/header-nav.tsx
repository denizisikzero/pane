"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pane } from "@/components/ui/pane";
import { GLASS_SPRING } from "@/lib/glass/config";
import { cn } from "@/lib/utils";

const links = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Playground", href: "/playground" },
];

/** Components owns its whole subtree; Docs owns the rest of /docs. */
function isActive(href: string, pathname: string) {
  if (href !== "/docs") return pathname.startsWith(href);
  return (
    pathname.startsWith("/docs") && !pathname.startsWith("/docs/components")
  );
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    // below sm the links don't fit next to the buttons; the menu has them
    <nav className="hidden items-center gap-1 font-medium text-sm sm:flex">
      {links.map((link) => {
        const active = isActive(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative isolate rounded-full px-3 py-1.5 transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active ? (
              <Pane
                layoutId="header-nav-indicator"
                transition={GLASS_SPRING.hover}
                radius={999}
                className="-z-10 absolute inset-0"
              />
            ) : null}
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
