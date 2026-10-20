"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onClick={() => toast("Event has been created")}>Default</Button>
      <Button onClick={() => toast.success("Your changes have been saved")}>
        Success
      </Button>
      <Button onClick={() => toast.info("Sync resumes when you're online")}>
        Info
      </Button>
      <Button onClick={() => toast.warning("Your storage is almost full")}>
        Warning
      </Button>
      <Button onClick={() => toast.error("Couldn't reach the server")}>
        Error
      </Button>
    </div>
  );
}
