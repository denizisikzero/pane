"use client";

import {
  ArchiveIcon,
  FileIcon,
  InboxIcon,
  type LucideIcon,
  PenSquareIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
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
import {
  type Folder,
  folders,
  labels,
} from "@/registry/pane/blocks/mail-01/components/mail-data";

const icons: Record<Folder, LucideIcon> = {
  inbox: InboxIcon,
  drafts: FileIcon,
  sent: SendIcon,
  archive: ArchiveIcon,
  trash: Trash2Icon,
};

export function MailSidebar({
  folder,
  onFolderChange,
  label,
  onLabelChange,
  counts,
  onCompose,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  folder: Folder;
  onFolderChange: (folder: Folder) => void;
  label: string | null;
  onLabelChange: (label: string | null) => void;
  /** unread mail per folder */
  counts: Partial<Record<Folder, number>>;
  onCompose: () => void;
}) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Compose"
              onClick={onCompose}
              className="font-medium text-foreground"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[calc(10px*var(--pane-radius-scale,1))] bg-foreground text-background">
                <PenSquareIcon className="size-4" />
              </span>
              <span>Compose</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mail</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((item) => {
                const Icon = icons[item.id];
                const count = counts[item.id];
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={folder === item.id && label === null}
                      tooltip={item.title}
                      onClick={() => {
                        onFolderChange(item.id);
                        onLabelChange(null);
                      }}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {count ? (
                      <SidebarMenuBadge>{count}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Labels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {labels.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={label === item.name}
                    tooltip={item.name}
                    onClick={() => onLabelChange(item.name)}
                  >
                    {/* a dot sized like an icon, so it lines up collapsed */}
                    <span className="flex size-4 shrink-0 items-center justify-center">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </span>
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
