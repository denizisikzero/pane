import { Direction } from "radix-ui";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

export default function AvatarRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex flex-wrap items-center gap-8">
        <Avatar size="lg">
          <AvatarFallback>سع</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <AvatarGroup>
          <Avatar size="lg">
            <AvatarFallback>أم</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>لي</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>نو</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </Direction.Provider>
  );
}
