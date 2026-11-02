"use client";

import {
  ExternalLinkIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import * as React from "react";
import { VideoToggle } from "@/components/blocks/video-toggle";
import { InstallCommand } from "@/components/install-command";
import { Button } from "@/components/ui/button";
import { Pane } from "@/components/ui/pane";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/** Preview widths, matching common breakpoints: md is 768px. */
const viewports = {
  desktop: { label: "Desktop", width: "100%", icon: MonitorIcon },
  tablet: { label: "Tablet", width: "768px", icon: TabletIcon },
  phone: { label: "Phone", width: "390px", icon: SmartphoneIcon },
} as const;
type Viewport = keyof typeof viewports;

/**
 * The interactive half of a block viewer: the preview/code tabs, the toolbar
 * and the preview frame, which the viewport switch narrows to a tablet or
 * phone width. The highlighted code is rendered on the server and passed in.
 */
export function BlockTabs({
  name,
  title,
  height,
  code,
}: {
  name: string;
  title: string;
  height: number;
  code: React.ReactNode;
}) {
  const [tab, setTab] = React.useState("preview");
  const [viewport, setViewport] = React.useState<Viewport>("desktop");

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex min-w-0 items-center gap-2">
          {/* only where the page is wide enough for a narrower frame to
              differ from the full one */}
          {tab === "preview" ? (
            <div className="hidden lg:flex">
              <ToggleGroup
                value={viewport}
                onValueChange={(value) => setViewport(value as Viewport)}
              >
                {(Object.keys(viewports) as Viewport[]).map((key) => {
                  const { label, icon: Icon } = viewports[key];
                  return (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label={label}
                      title={label}
                    >
                      <Icon className="size-4" />
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
          ) : null}
          <InstallCommand
            compact
            command={`npx shadcn@latest add @pane/${name}`}
          />
          <VideoToggle />
          <Button size="icon" asChild>
            <a
              href={`/view/${name}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} in a new tab`}
            >
              <ExternalLinkIcon />
            </a>
          </Button>
        </div>
      </div>
      <TabsContent value="preview">
        <div className="flex justify-center">
          <Pane
            radius={24}
            className="w-full overflow-hidden transition-[max-width] duration-300 ease-out motion-reduce:transition-none"
            style={{ maxWidth: viewports[viewport].width }}
          >
            <iframe
              src={`/view/${name}`}
              title={title}
              loading="lazy"
              className="block w-full"
              style={{ height }}
            />
          </Pane>
        </div>
      </TabsContent>
      <TabsContent value="code">{code}</TabsContent>
    </Tabs>
  );
}
