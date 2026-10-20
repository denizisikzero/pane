import { InfoIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Pane } from "@/components/ui/pane";

export function Callout({
  title,
  icon: Icon = InfoIcon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Pane radius={16} className="flex gap-3 p-4">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-col gap-1 text-sm">
        <p className="font-medium">{title}</p>
        <div className="text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </Pane>
  );
}
