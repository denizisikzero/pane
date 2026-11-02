"use client";

import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 px-4 lg:px-6">
      <SidebarTrigger />
      <h1 className="font-semibold text-base">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden w-56 lg:block">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search…"
            aria-label="Search"
            className="pl-9"
          />
        </div>
        <Button size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Button variant="prominent">
          <PlusIcon />
          <span className="hidden sm:inline">New invoice</span>
        </Button>
      </div>
    </header>
  );
}
