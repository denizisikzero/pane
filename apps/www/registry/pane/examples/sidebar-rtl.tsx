import { HomeIcon, InboxIcon, SettingsIcon } from "lucide-react";
import { Direction } from "radix-ui";
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

export default function SidebarRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <SidebarProvider className="min-h-0 w-auto">
          <Sidebar collapsible="none" className="h-auto w-56">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>التطبيق</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HomeIcon />
                        <span>الرئيسية</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <InboxIcon />
                        <span>البريد الوارد</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SettingsIcon />
                        <span>الإعدادات</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
    </Direction.Provider>
  );
}
