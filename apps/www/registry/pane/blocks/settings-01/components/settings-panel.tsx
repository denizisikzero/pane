"use client";

import {
  MonitorIcon,
  MoonIcon,
  SunIcon,
  Volume1Icon,
  Volume2Icon,
} from "lucide-react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const notifications = [
  {
    id: "push",
    label: "Push notifications",
    description: "Alerts on this device.",
    defaultChecked: true,
  },
  {
    id: "email",
    label: "Email digest",
    description: "A summary once a week.",
    defaultChecked: false,
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function SettingsPanel() {
  const [volume, setVolume] = React.useState([60]);

  return (
    <Card
      variant="thick"
      className="[--pane-blur-thick:var(--pane-blur-overlay)] [--pane-tint-thick:var(--pane-tint-overlay)]"
    >
      <CardHeader>
        <CardTitle className="text-xl">Settings</CardTitle>
        <CardDescription>Manage how the app looks and behaves.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <Section title="Notifications">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-0.5">
                <label htmlFor={item.id} className="font-medium text-sm">
                  {item.label}
                </label>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <Switch id={item.id} defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </Section>

        <Section title="Appearance">
          <ToggleGroup defaultValue="system" className="w-full">
            <ToggleGroupItem value="light">
              <SunIcon />
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark">
              <MoonIcon />
              Dark
            </ToggleGroupItem>
            <ToggleGroupItem value="system">
              <MonitorIcon />
              Auto
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-sm">Language</span>
            <Select defaultValue="en">
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        <Section title="Sound">
          <div className="flex items-center gap-3">
            <Volume1Icon className="size-4 shrink-0 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              aria-label="Volume"
            />
            <Volume2Icon className="size-4 shrink-0 text-muted-foreground" />
          </div>
        </Section>
      </CardContent>
    </Card>
  );
}
