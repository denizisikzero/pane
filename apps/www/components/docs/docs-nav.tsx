"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { docsNav } from "@/lib/site-config";

/**
 * The docs navigation, built from the registry's own Sidebar menu so the
 * site dogfoods it. It sits straight on the page: the site keeps glass for
 * the components it shows, not its own chrome.
 */
export function DocsNav({
  onNavigate,
  mobile = false,
}: {
  onNavigate?: () => void;
  /** include links meant for the mobile menu only */
  mobile?: boolean;
}) {
  const pathname = usePathname();

  const groups = docsNav.map((group) => (
    <SidebarGroup key={group.title}>
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {group.items
            .filter((item) => mobile || !item.mobileOnly)
            .map((item) => {
              const active = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));

  return (
    // only here for the menu's context; the layout around it is the docs'
    <SidebarProvider className="min-h-0">
      <nav aria-label="Documentation" className="flex w-full flex-col">
        {groups}
      </nav>
    </SidebarProvider>
  );
}
