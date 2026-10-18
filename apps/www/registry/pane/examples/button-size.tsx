import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const sizes = [
  { size: "xs", icon: "icon-xs", label: "Extra small" },
  { size: "sm", icon: "icon-sm", label: "Small" },
  { size: "default", icon: "icon", label: "Default" },
  { size: "lg", icon: "icon-lg", label: "Large" },
] as const;

export default function ButtonSize() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {sizes.map(({ size, icon, label }) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <Button size={icon} aria-label="Add">
            <PlusIcon />
          </Button>
          <Button size={size}>{label}</Button>
        </div>
      ))}
    </div>
  );
}
