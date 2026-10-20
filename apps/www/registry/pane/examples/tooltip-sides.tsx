import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button className="capitalize">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>On the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
