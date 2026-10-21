"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Pane } from "@/components/ui/pane";

const COMMAND = "npx shadcn@latest add @pane/button";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  return (
    <Pane radius={20} interactive className="inline-flex">
      <button
        type="button"
        aria-label="Copy install command"
        onClick={async () => {
          await navigator.clipboard.writeText(COMMAND);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex h-11 cursor-pointer items-center gap-3 px-5 font-mono text-sm"
      >
        <span className="text-muted-foreground select-none">$</span>
        <span>{COMMAND}</span>
        {copied ? (
          <CheckIcon className="size-4 text-muted-foreground" />
        ) : (
          <CopyIcon className="size-4 text-muted-foreground" />
        )}
      </button>
    </Pane>
  );
}
