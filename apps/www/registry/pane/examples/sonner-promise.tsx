"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerPromise() {
  return (
    <Button
      onClick={() =>
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: "Uploading photos...",
          success: "12 photos uploaded",
          error: "Upload failed",
        })
      }
    >
      Upload
    </Button>
  );
}
