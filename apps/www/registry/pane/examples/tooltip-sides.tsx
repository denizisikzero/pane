import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">On the top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">On the right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">On the bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">On the left</TooltipContent>
      </Tooltip>
    </div>
  );
}
