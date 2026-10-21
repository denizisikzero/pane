import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56">
          Aligned to the start of the button.
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-56">
          Aligned to the center of the button.
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-56">
          Aligned to the end of the button.
        </PopoverContent>
      </Popover>
    </div>
  );
}
