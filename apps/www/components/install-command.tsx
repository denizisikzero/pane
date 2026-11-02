"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

export function InstallCommand({
  command = "npx shadcn@latest add @pane/button",
  compact = false,
}: {
  command?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <Pane
      radius={compact ? 16 : 20}
      interactive
      className="inline-flex max-w-full"
    >
      <button
        type="button"
        aria-label="Copy install command"
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={cn(
          "flex min-w-0 cursor-pointer items-center gap-3 font-mono",
          compact ? "h-9 px-3.5 text-xs" : "h-11 px-5 text-sm",
        )}
      >
        <span className="text-muted-foreground select-none">$</span>
        <span className="truncate">{command}</span>
        {copied ? (
          <CheckIcon className="size-4 text-muted-foreground" />
        ) : (
          <CopyIcon className="size-4 text-muted-foreground" />
        )}
      </button>
    </Pane>
  );
}
