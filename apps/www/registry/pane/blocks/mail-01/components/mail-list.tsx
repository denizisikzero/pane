"use client";

import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Mail } from "@/registry/pane/blocks/mail-01/components/mail-data";

const NOW = new Date("2026-10-31T12:00:00Z");
const time = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});
const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Today's mail by the clock, anything older by the date. */
export function shortDate(iso: string) {
  const date = new Date(iso);
  return date.toISOString().slice(0, 10) === NOW.toISOString().slice(0, 10)
    ? time.format(date)
    : day.format(date);
}

export function MailList({
  title,
  mails,
  selected,
  onSelect,
  unreadOnly,
  onUnreadOnlyChange,
  query,
  onQueryChange,
  className,
}: {
  title: string;
  mails: Mail[];
  selected: string | null;
  onSelect: (id: string) => void;
  unreadOnly: boolean;
  onUnreadOnlyChange: (unreadOnly: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  className?: string;
}) {
  return (
    <Card
      variant="blur"
      radius={24}
      className={cn("min-h-0 gap-0 py-0", className)}
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="font-semibold text-lg">{title}</h1>
          <Tabs
            value={unreadOnly ? "unread" : "all"}
            onValueChange={(value) => onUnreadOnlyChange(value === "unread")}
            className="ml-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="relative">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 size-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search mail"
            aria-label="Search mail"
            className="pl-9"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {mails.length === 0 ? (
          <p className="px-4 py-10 text-center text-muted-foreground text-sm">
            Nothing here.
          </p>
        ) : null}
        <ul className="flex flex-col gap-0.5">
          {mails.map((mail) => (
            <li key={mail.id}>
              <button
                type="button"
                onClick={() => onSelect(mail.id)}
                data-selected={selected === mail.id}
                className="flex w-full flex-col gap-1 rounded-[16px] px-3 py-2.5 text-left outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[selected=true]:bg-foreground/[0.07]"
              >
                <span className="flex items-center gap-2">
                  {mail.read ? null : (
                    <>
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-(--pane-accent)"
                      />
                      <span className="sr-only">Unread:</span>
                    </>
                  )}
                  <span
                    className={cn(
                      "truncate text-sm",
                      mail.read ? "font-medium" : "font-semibold",
                    )}
                  >
                    {mail.name}
                  </span>
                  <span className="ml-auto shrink-0 text-muted-foreground text-xs tabular-nums">
                    {shortDate(mail.date)}
                  </span>
                </span>
                <span className="truncate font-medium text-xs">
                  {mail.subject}
                </span>
                <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                  {mail.body.replace(/\s+/g, " ")}
                </span>
                {mail.labels.length > 0 ? (
                  <span className="mt-1 flex gap-1.5">
                    {mail.labels.map((label) => (
                      <Badge key={label}>{label}</Badge>
                    ))}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
