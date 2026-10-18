"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const link = "pane.theui.company/a/summer";

export default function PopoverDemo() {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Share</Button>
      </PopoverTrigger>
      <PopoverContent className="grid w-80 gap-3">
        <div className="grid gap-1">
          <p className="font-medium">Share this album</p>
          <p className="text-muted-foreground">
            Anyone with the link can view it.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input readOnly defaultValue={link} aria-label="Album link" />
          <Button
            size="icon"
            aria-label={copied ? "Copied" : "Copy link"}
            onClick={async () => {
              await navigator.clipboard.writeText(`https://${link}`);
              setCopied(true);
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
