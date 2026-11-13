import { Direction } from "radix-ui";
import { Switch } from "@/components/ui/switch";

export default function SwitchRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div
        dir="rtl"
        lang="ar"
        className="flex w-full max-w-sm items-start justify-between gap-6"
      >
        <div className="grid gap-1">
          <label htmlFor="switch-rtl" className="font-medium text-sm">
            التحديثات التلقائية
          </label>
          <p className="text-muted-foreground text-sm">
            ثبّت الإصدارات الجديدة ليلًا.
          </p>
        </div>
        <Switch id="switch-rtl" defaultChecked />
      </div>
    </Direction.Provider>
  );
}
