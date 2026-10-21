"use client";

import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function SidebarDemo() {
  const [active, setActive] = React.useState("Inbox");

  return (
    // `collapsible="none"` keeps the sidebar in the flow of this preview;
    // in an app it pins to the edge of the window and collapses
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="h-auto w-56">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "Home"}
                    onClick={() => setActive("Home")}
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "Inbox"}
                    onClick={() => setActive("Inbox")}
                  >
                    <InboxIcon />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "Calendar"}
                    onClick={() => setActive("Calendar")}
                  >
                    <CalendarIcon />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "Search"}
                    onClick={() => setActive("Search")}
                  >
                    <SearchIcon />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "Settings"}
                    onClick={() => setActive("Settings")}
                  >
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
