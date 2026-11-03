"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/**
 * `asChild` as a spread, not a literal attribute: `shadcn add` rewrites a
 * literal one into a `render` prop for Base UI styles, which these Radix
 * triggers would ignore. See CONTRIBUTING.md.
 */
const asChild = { asChild: true } as const;

const days = ["Mon 9", "Tue 10", "Wed 11"];
const slots = ["10:00", "13:30", "16:00"];

/** A 20-minute intro call: pick a day and a time, then confirm. */
export function BookCall() {
  const [day, setDay] = React.useState(days[0]);
  const [slot, setSlot] = React.useState(slots[1]);

  return (
    <Dialog>
      <DialogTrigger {...asChild}>
        <Button size="lg">
          <CalendarIcon />
          Book an intro call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an intro call</DialogTitle>
          <DialogDescription>
            Twenty minutes with a designer, on video. Times are in your zone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            value={day}
            onValueChange={(value) => value && setDay(value)}
            aria-label="Day"
            className="w-full"
          >
            {days.map((item) => (
              <ToggleGroupItem key={item} value={item}>
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup
            value={slot}
            onValueChange={(value) => value && setSlot(value)}
            aria-label="Time"
            className="w-full"
          >
            {slots.map((item) => (
              <ToggleGroupItem key={item} value={item} className="tabular-nums">
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <DialogFooter>
          <DialogClose {...asChild}>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose {...asChild}>
            <Button
              variant="inverted"
              onClick={() =>
                toast("Call booked", {
                  description: `${day} at ${slot}. The invite is on its way.`,
                })
              }
            >
              Confirm {day}, {slot}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
