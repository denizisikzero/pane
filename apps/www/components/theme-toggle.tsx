"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "system", label: "System", icon: MonitorIcon },
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const activeTheme = mounted ? (theme ?? "system") : "system";
  const activeIndex = themes.findIndex(({ value }) => value === activeTheme);
  const active = themes[activeIndex] ?? themes[0];
  const next = themes[(activeIndex + 1) % themes.length] ?? themes[0];
  const ActiveIcon = active.icon;

  return (
    <Button
      size="icon"
      aria-label={`${active.label} theme. Switch to ${next.label}`}
      title={`${active.label} theme`}
      onClick={() => setTheme(next.value)}
    >
      <ActiveIcon />
    </Button>
  );
}
