import { Direction } from "radix-ui";
import { Pane } from "@/components/ui/pane";

export default function PaneRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div
        dir="rtl"
        lang="ar"
        className="flex flex-wrap items-center justify-center gap-6"
      >
        <Pane
          radius={28}
          className="flex h-28 w-40 items-center justify-center"
        >
          <span className="font-medium text-sm">عادي</span>
        </Pane>
        <Pane
          variant="thick"
          radius={28}
          className="flex h-28 w-40 items-center justify-center"
        >
          <span className="font-medium text-sm">سميك</span>
        </Pane>
        <Pane
          variant="thin"
          radius={28}
          className="flex h-28 w-40 items-center justify-center"
        >
          <span className="font-medium text-sm">رقيق</span>
        </Pane>
      </div>
    </Direction.Provider>
  );
}
