import { BadgeCheckIcon, ClockIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="prominent">
        <BadgeCheckIcon /> Verified
      </Badge>
      <Badge>
        <ClockIcon /> Pending
      </Badge>
      <Badge variant="destructive" tinted>
        <XIcon /> Declined
      </Badge>
    </div>
  );
}
