"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerDemo() {
  return (
    <Button
      onClick={() =>
        toast("Your photos are backed up", {
          description: "1,284 photos, synced a moment ago.",
        })
      }
    >
      Show toast
    </Button>
  );
}
