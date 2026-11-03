"use client";

import {
  BarChart3Icon,
  BoxIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  type LucideIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/registry/pane/blocks/dashboard-01/components/nav-user";

interface NavItem {
  title: string;
  icon: LucideIcon;
  badge?: number;
}

const workspace: NavItem[] = [
  { title: "Overview", icon: LayoutDashboardIcon },
  { title: "Analytics", icon: BarChart3Icon },
  { title: "Customers", icon: UsersIcon },
  { title: "Orders", icon: CreditCardIcon, badge: 8 },
  { title: "Products", icon: BoxIcon },
];

const resources: NavItem[] = [
  { title: "Reports", icon: FileTextIcon },
  { title: "Settings", icon: SettingsIcon },
  { title: "Help", icon: LifeBuoyIcon },
];

function NavGroup({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: NavItem[];
  active: string;
  onSelect: (title: string) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={active === item.title}
                tooltip={item.title}
                onClick={() => onSelect(item.title)}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
              {item.badge ? (
                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = React.useState("Overview");

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="font-semibold">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[calc(10px*var(--pane-radius-scale,1))] bg-foreground text-background text-sm">
                U
              </span>
              <span className="flex flex-col gap-0.5 leading-none">
                <span>Uniform Interface</span>
                <span className="font-normal text-muted-foreground text-xs">
                  Billing
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup
          label="Workspace"
          items={workspace}
          active={active}
          onSelect={setActive}
        />
        <NavGroup
          label="Resources"
          items={resources}
          active={active}
          onSelect={setActive}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name="Sam Carter" email="sam@uniform.app" initials="SC" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
