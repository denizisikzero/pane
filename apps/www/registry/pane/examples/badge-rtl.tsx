import { CheckIcon } from "lucide-react";
import { Direction } from "radix-ui";
import { Badge } from "@/components/ui/badge";

export default function BadgeRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div
        dir="rtl"
        lang="ar"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Badge>جديد</Badge>
        <Badge>
          <CheckIcon />
          تم التحقق
        </Badge>
      </div>
    </Direction.Provider>
  );
}
