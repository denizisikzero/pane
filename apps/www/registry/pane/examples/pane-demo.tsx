import { Pane } from "@/components/ui/pane";

const variants = [
  { variant: "default", label: "Default" },
  { variant: "blur", label: "Blur" },
  { variant: "transparent", label: "Transparent" },
] as const;

export default function PaneDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {variants.map(({ variant, label }) => (
        <Pane
          key={variant}
          variant={variant}
          radius={28}
          className="flex h-28 w-40 items-center justify-center"
        >
          <span className="text-sm font-medium">{label}</span>
        </Pane>
      ))}
    </div>
  );
}
