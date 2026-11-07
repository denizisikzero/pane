"use client";

import {
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavUser({
  name,
  email,
  initials,
}: {
  name: string;
  email: string;
  initials: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* styled on the trigger itself rather than through asChild, which
              Base UI installs rewrite */}
          <DropdownMenuTrigger className="flex h-12 w-full items-center gap-2 rounded-[calc(12px*var(--pane-radius-scale,1))] p-2 text-left text-sm outline-none transition-colors hover:bg-foreground/[0.05] focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=open]:bg-foreground/[0.05] group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="grid min-w-0 flex-1 leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{name}</span>
              <span className="truncate text-muted-foreground text-xs">
                {email}
              </span>
            </span>
            <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-60">
            <DropdownMenuLabel className="flex items-center gap-2 font-normal">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {email}
                </span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon />
                Account
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
