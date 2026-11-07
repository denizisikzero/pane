"use client";

import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { GlassStage } from "@/components/glass-stage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { renders } from "@/lib/previews";

function Tile({
  photo,
  links,
  children,
}: {
  photo: { src: string; dark: boolean };
  links: { title: string; slug: string }[];
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <GlassStage
        photo={photo.src}
        dark={photo.dark}
        className="flex aspect-[4/5] items-end rounded-[28px] p-4"
      >
        <div className="w-full">{children}</div>
      </GlassStage>
      <figcaption className="flex gap-3 px-1 text-muted-foreground text-sm">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/docs/components/${link.slug}`}
            className="transition-colors hover:text-foreground"
          >
            {link.title}
          </Link>
        ))}
      </figcaption>
    </figure>
  );
}

/** Frost: invite someone to the scene. */
function InviteCard() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        toast("Invite sent", { description: `${email} can edit frost.scene` });
        event.currentTarget.reset();
      }}
    >
      <Input
        name="email"
        type="email"
        required
        placeholder="name@studio.com"
        aria-label="Email"
      />
      <Button type="submit" variant="prominent">
        Invite
      </Button>
    </form>
  );
}

const passes = [
  { id: "shadows", label: "Soft shadows", on: true },
  { id: "reflections", label: "Reflections", on: true },
  { id: "dof", label: "Depth of field", on: false },
];

/** Mesh: which render passes run, and what that costs. */
function PassesCard() {
  const [on, setOn] = React.useState(
    () => new Set(passes.filter((p) => p.on).map((p) => p.id)),
  );
  return (
    <Pane variant="thick" radius={22} className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Render passes</span>
        <span className="shrink-0 text-muted-foreground tabular-nums">
          {12 + on.size * 9}s a frame
        </span>
      </div>
      {passes.map((pass) => (
        <div key={pass.id} className="flex items-center gap-2.5">
          <Checkbox
            id={`pass-${pass.id}`}
            checked={on.has(pass.id)}
            onCheckedChange={(value) =>
              setOn((current) => {
                const next = new Set(current);
                if (value === true) next.add(pass.id);
                else next.delete(pass.id);
                return next;
              })
            }
          />
          <label htmlFor={`pass-${pass.id}`} className="text-sm">
            {pass.label}
          </label>
        </div>
      ))}
    </Pane>
  );
}

const lights = {
  studio: "Two softboxes and a white sweep.",
  sunset: "Low warm sun from the left.",
  night: "A single cool rim light.",
} as const;

/** Satin: the lighting setup, as tabs. */
function LightingCard() {
  const [light, setLight] = React.useState<keyof typeof lights>("studio");
  return (
    <div className="flex flex-col items-start gap-2">
      <Tabs
        value={light}
        onValueChange={(value) => setLight(value as keyof typeof lights)}
      >
        <TabsList>
          <TabsTrigger value="studio">Studio</TabsTrigger>
          <TabsTrigger value="sunset">Sunset</TabsTrigger>
          <TabsTrigger value="night">Night</TabsTrigger>
        </TabsList>
      </Tabs>
      <Pane variant="thick" radius={999} className="px-3 py-1.5 text-xs">
        {lights[light]}
      </Pane>
    </div>
  );
}

/** Three renders, one small live component on each. */
export function PhotoTiles() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Tile
        photo={renders.frost}
        links={[
          { title: "Input", slug: "input" },
          { title: "Button", slug: "button" },
          { title: "Sonner", slug: "sonner" },
        ]}
      >
        <InviteCard />
      </Tile>
      <Tile
        photo={renders.mesh}
        links={[
          { title: "Checkbox", slug: "checkbox" },
          { title: "Pane", slug: "pane" },
        ]}
      >
        <PassesCard />
      </Tile>
      <Tile
        photo={renders.satin}
        links={[
          { title: "Tabs", slug: "tabs" },
          { title: "Pane", slug: "pane" },
        ]}
      >
        <LightingCard />
      </Tile>
    </div>
  );
}
