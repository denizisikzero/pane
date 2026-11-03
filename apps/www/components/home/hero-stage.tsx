"use client";

import {
  ChevronDownIcon,
  Move3dIcon,
  Redo2Icon,
  Rotate3dIcon,
  Scale3dIcon,
  SearchIcon,
  Undo2Icon,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { GlassStage } from "@/components/glass-stage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { renders } from "@/lib/photos";

const tools = [
  { value: "move", label: "Move", key: "G", icon: Move3dIcon },
  { value: "rotate", label: "Rotate", key: "R", icon: Rotate3dIcon },
  { value: "scale", label: "Scale", key: "S", icon: Scale3dIcon },
] as const;

/**
 * The hero: a 3D editor's chrome laid over a chrome render, kept to the
 * edges so the render stays the picture. Every piece is a live component —
 * hover the tools, open the menus, search.
 */
export function HeroStage() {
  const [tool, setTool] = React.useState<string>("rotate");

  return (
    <GlassStage
      photo={renders.chrome.src}
      imageClassName="object-[50%_35%]"
      className="flex min-h-[30rem] flex-col justify-between gap-6 rounded-[2.25rem] p-4 sm:min-h-[36rem] sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-60">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 size-4 text-muted-foreground" />
          <Input
            placeholder="Search materials"
            aria-label="Search materials"
            className="pl-9"
          />
        </div>
        <Pane
          variant="thick"
          radius={999}
          className="flex items-center gap-2.5 py-1 pr-3 pl-1"
        >
          {/* side by side, not stacked: overlapping glass circles read as
              a tangle */}
          <div className="flex gap-1">
            {["DI", "MK", "AL"].map((initials) => (
              <Avatar key={initials} className="size-8">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Badge variant="prominent">Live</Badge>
        </Pane>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <Select defaultValue="chrome">
          <SelectTrigger className="w-40" aria-label="Material">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chrome">Chrome</SelectItem>
            <SelectItem value="frost">Frost</SelectItem>
            <SelectItem value="mesh">Mesh</SelectItem>
            <SelectItem value="satin">Satin</SelectItem>
          </SelectContent>
        </Select>

        <Pane
          variant="thick"
          radius={999}
          className="order-last mx-auto flex items-center gap-1 p-1.5 sm:order-none"
        >
          <ToggleGroup
            value={tool}
            onValueChange={(next) => next && setTool(next)}
            aria-label="Tool"
          >
            {tools.map(({ value, label, key, icon: Icon }) => (
              <Tooltip key={value}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value={value} aria-label={label}>
                    <Icon className="size-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  {label} · {key}
                </TooltipContent>
              </Tooltip>
            ))}
          </ToggleGroup>
          <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" aria-label="Undo">
                <Undo2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo · ⌘Z</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" aria-label="Redo">
                <Redo2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo · ⇧⌘Z</TooltipContent>
          </Tooltip>
        </Pane>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="prominent">
              Export
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Export as</DropdownMenuLabel>
            {["PNG · 4K", "EXR · 32-bit", "MP4 · turntable"].map((format) => (
              <DropdownMenuItem
                key={format}
                onSelect={() =>
                  toast("Export started", { description: `chrome.${format}` })
                }
              >
                {format}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </GlassStage>
  );
}
