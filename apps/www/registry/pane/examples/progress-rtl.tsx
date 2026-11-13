import { Direction } from "radix-ui";
import { Progress } from "@/components/ui/progress";

export default function ProgressRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex w-72 max-w-full flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">رفع الصور</span>
          <span className="text-muted-foreground tabular-nums">72%</span>
        </div>
        <Progress value={72} aria-label="رفع الصور" />
      </div>
    </Direction.Provider>
  );
}
