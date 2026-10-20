import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const aligns = ["start", "center", "end"] as const;

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {aligns.map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button className="capitalize">{align}</Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="w-56">
            Aligned to the {align} of the button.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
