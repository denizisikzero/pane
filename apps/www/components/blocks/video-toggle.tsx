"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreviewVideo } from "@/lib/use-preview-video";

/** The previews' video background switch, for the block toolbar. */
export function VideoToggle() {
  const [video, toggle] = usePreviewVideo();

  return (
    <Button
      size="icon"
      onClick={toggle}
      aria-label={video ? "Hide video background" : "Show video background"}
    >
      {video ? <EyeIcon /> : <EyeOffIcon />}
    </Button>
  );
}
