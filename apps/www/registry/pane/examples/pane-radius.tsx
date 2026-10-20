import { Pane } from "@/components/ui/pane";

export default function PaneRadius() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {[12, 24, 40].map((radius) => (
        <Pane
          variant="blur"
          key={radius}
          radius={radius}
          className="flex size-28 items-center justify-center"
        >
          <span className="text-sm font-medium tabular-nums">{radius}px</span>
        </Pane>
      ))}
    </div>
  );
}
