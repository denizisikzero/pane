"use client";

import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  type Folder,
  folders,
  mails as initialMails,
  type Mail as MailItem,
} from "@/registry/pane/blocks/mail-01/components/mail-data";
import { MailList } from "@/registry/pane/blocks/mail-01/components/mail-list";
import { MailSidebar } from "@/registry/pane/blocks/mail-01/components/mail-sidebar";
import { MailView } from "@/registry/pane/blocks/mail-01/components/mail-view";

export function Mail() {
  const [mails, setMails] = React.useState<MailItem[]>(initialMails);
  const [folder, setFolder] = React.useState<Folder>("inbox");
  const [label, setLabel] = React.useState<string | null>(null);
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>("m1");
  // below lg the list and the message take turns: next to the sidebar,
  // a tablet has no room for both
  const [reading, setReading] = React.useState(false);

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return mails
      .filter((mail) =>
        label ? mail.labels.includes(label) : mail.folder === folder,
      )
      .filter((mail) => !unreadOnly || !mail.read)
      .filter(
        (mail) =>
          !q ||
          [mail.name, mail.subject, mail.body].some((text) =>
            text.toLowerCase().includes(q),
          ),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [mails, folder, label, unreadOnly, query]);

  const counts = React.useMemo(() => {
    const result: Partial<Record<Folder, number>> = {};
    for (const mail of mails) {
      if (!mail.read) result[mail.folder] = (result[mail.folder] ?? 0) + 1;
    }
    result.drafts = mails.filter((mail) => mail.folder === "drafts").length;
    return result;
  }, [mails]);

  const current = mails.find((mail) => mail.id === selected) ?? null;
  const title =
    label ?? folders.find((item) => item.id === folder)?.title ?? "Mail";

  const update = (id: string, change: Partial<MailItem>) =>
    setMails((prev) =>
      prev.map((mail) => (mail.id === id ? { ...mail, ...change } : mail)),
    );

  const moveTo = (id: string, to: Folder) => {
    update(id, { folder: to });
    setSelected(null);
    setReading(false);
  };

  return (
    <SidebarProvider className="h-svh min-h-0">
      <MailSidebar
        folder={folder}
        onFolderChange={setFolder}
        label={label}
        onLabelChange={setLabel}
        counts={counts}
        onCompose={() => {
          setFolder("drafts");
          setLabel(null);
        }}
      />
      <SidebarInset className="min-h-0 min-w-0 flex-row gap-3 p-3 md:pl-0">
        <MailList
          title={title}
          mails={visible}
          selected={selected}
          onSelect={(id) => {
            setSelected(id);
            update(id, { read: true });
            setReading(true);
          }}
          unreadOnly={unreadOnly}
          onUnreadOnlyChange={setUnreadOnly}
          query={query}
          onQueryChange={setQuery}
          className={cn(
            "w-full min-w-0 lg:w-[340px] lg:shrink-0 xl:w-[380px]",
            reading && "hidden lg:flex",
          )}
        />
        <MailView
          mail={current}
          onBack={() => setReading(false)}
          onArchive={(id) => moveTo(id, "archive")}
          onDelete={(id) => moveTo(id, "trash")}
          onMarkUnread={(id) => {
            update(id, { read: false });
            setSelected(null);
            setReading(false);
          }}
          className={cn("min-w-0 flex-1", !reading && "hidden lg:flex")}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
