"use client";

import {
  ArchiveIcon,
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  ForwardIcon,
  MailIcon,
  ReplyAllIcon,
  ReplyIcon,
  Trash2Icon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Mail } from "@/registry/pane/blocks/mail-01/components/mail-data";

const full = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function MailView({
  mail,
  onBack,
  onArchive,
  onDelete,
  onMarkUnread,
  className,
}: {
  mail: Mail | null;
  onBack: () => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkUnread: (id: string) => void;
  className?: string;
}) {
  const [reply, setReply] = React.useState("");
  const [mute, setMute] = React.useState(false);
  const muteId = React.useId();

  // a fresh draft for every thread
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on thread change only
  React.useEffect(() => {
    setReply("");
  }, [mail?.id]);

  return (
    <Card
      variant="thick"
      radius={24}
      className={cn("min-h-0 gap-0 py-0", className)}
    >
      <div className="flex items-center gap-1.5 p-3">
        {/* Button styles its inner element; layout classes go on a wrapper */}
        <div className="lg:hidden">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Back to the list"
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Archive"
          disabled={!mail}
          onClick={() => mail && onArchive(mail.id)}
        >
          <ArchiveIcon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Move to trash"
          disabled={!mail}
          onClick={() => mail && onDelete(mail.id)}
        >
          <Trash2Icon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Mark as unread"
          disabled={!mail}
          onClick={() => mail && onMarkUnread(mail.id)}
        >
          <MailIcon />
        </Button>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Reply"
            disabled={!mail}
          >
            <ReplyIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Reply all"
            disabled={!mail}
          >
            <ReplyAllIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Forward"
            disabled={!mail}
          >
            <ForwardIcon />
          </Button>
          <DropdownMenu>
            {/* styled on the trigger itself rather than through asChild, which
                Base UI installs rewrite */}
            <DropdownMenuTrigger
              aria-label="More"
              disabled={!mail}
              className="flex size-9 items-center justify-center rounded-[calc(16px*var(--pane-radius-scale,1))] outline-none transition-colors hover:bg-foreground/[0.07] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-foreground/[0.07]"
            >
              <EllipsisVerticalIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
              <DropdownMenuItem>Star thread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Block sender</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mx-4 h-px bg-foreground/[0.08]" />

      {mail ? (
        <>
          <div className="flex items-start gap-3 p-5">
            <Avatar size="lg">
              <AvatarFallback>{initials(mail.name)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 gap-0.5">
              <div className="font-semibold">{mail.name}</div>
              <div className="truncate text-sm">{mail.subject}</div>
              <div className="truncate text-muted-foreground text-xs">
                From {mail.email}
              </div>
            </div>
            <div className="shrink-0 text-muted-foreground text-xs">
              {full.format(new Date(mail.date))}
            </div>
          </div>
          <div className="mx-4 h-px bg-foreground/[0.08]" />
          <div className="min-h-0 flex-1 overflow-y-auto whitespace-pre-line p-5 text-sm leading-relaxed">
            {mail.body}
          </div>
          <form
            className="flex flex-col gap-3 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              setReply("");
            }}
          >
            <Textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              placeholder={`Reply to ${mail.name}…`}
              aria-label={`Reply to ${mail.name}`}
              className="min-h-24"
            />
            <div className="flex items-center gap-2">
              <Switch id={muteId} checked={mute} onCheckedChange={setMute} />
              <label htmlFor={muteId} className="text-muted-foreground text-xs">
                Mute this thread
              </label>
              <div className="ml-auto">
                <Button
                  type="submit"
                  variant="prominent"
                  size="sm"
                  disabled={!reply.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center p-10 text-muted-foreground text-sm">
          No message selected
        </div>
      )}
    </Card>
  );
}
