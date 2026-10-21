import { CheckIcon } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarWithBadge() {
  return (
    <div className="flex items-center gap-6">
      <Avatar size="lg">
        <AvatarFallback>DI</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AK</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  );
}
