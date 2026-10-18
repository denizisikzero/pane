"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 3 at 9:00 AM",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        Show toast
      </Button>
      <Button onClick={() => toast.success("Your changes have been saved")}>
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Couldn't reach the server")}
      >
        Error
      </Button>
    </div>
  );
}
