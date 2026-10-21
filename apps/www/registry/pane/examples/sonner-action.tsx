"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerAction() {
  return (
    <Button
      onClick={() =>
        toast("Conversation archived", {
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Archive
    </Button>
  );
}
