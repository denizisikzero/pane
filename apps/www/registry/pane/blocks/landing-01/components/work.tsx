"use client";

import { ArrowUpRightIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Pane } from "@/components/ui/pane";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  type Discipline,
  projects,
} from "@/registry/pane/blocks/landing-01/components/studio-data";

const filters: { value: Discipline | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "product", label: "Product" },
  { value: "brand", label: "Brand" },
  { value: "motion", label: "Motion" },
];

/** The portfolio: a filter, then each project as a photo with its caption on glass. */
export function Work() {
  const [filter, setFilter] = React.useState<Discipline | "all">("all");
  const shown = projects.filter(
    (project) => filter === "all" || project.discipline === filter,
  );

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as typeof filter)}
      >
        <TabsList>
          {filters.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* a bento: the first project large, the rest stacked beside it */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {shown.map((project, index) => (
          <a
            key={project.title}
            href="#work"
            className={cn(
              "group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[calc(20px*var(--pane-radius-scale,1))] p-3",
              index === 0 &&
                shown.length > 1 &&
                "sm:col-span-2 sm:aspect-[16/10] lg:row-span-2 lg:aspect-auto",
              index > 0 && "lg:aspect-[16/10]",
            )}
          >
            {/* biome-ignore lint/performance/noImgElement: a plain img keeps the block free of next.config image settings */}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="-z-10 absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className={cn("flex justify-end", project.dark && "dark")}>
              <Badge className="capitalize">{project.discipline}</Badge>
            </div>
            <Pane
              variant="thick"
              radius={16}
              className={cn(
                "flex items-center justify-between gap-3 p-3.5",
                project.dark && "dark text-foreground",
              )}
            >
              <div className="min-w-0">
                <div className="truncate font-medium text-sm">
                  {project.title}
                </div>
                <div className="text-muted-foreground text-xs">
                  {project.client} · {project.year}
                </div>
              </div>
              <ArrowUpRightIcon className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Pane>
          </a>
        ))}
      </div>
    </div>
  );
}
