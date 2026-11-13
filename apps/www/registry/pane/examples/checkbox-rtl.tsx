import { Direction } from "radix-ui";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Checkbox id="checkbox-rtl-terms" />
          <label htmlFor="checkbox-rtl-terms" className="font-medium text-sm">
            أوافق على الشروط والأحكام
          </label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="checkbox-rtl-notifications" defaultChecked />
          <div className="grid gap-1">
            <label
              htmlFor="checkbox-rtl-notifications"
              className="font-medium text-sm"
            >
              تفعيل الإشعارات
            </label>
            <p className="text-muted-foreground text-sm">
              يمكنك إيقافها في أي وقت.
            </p>
          </div>
        </div>
      </div>
    </Direction.Provider>
  );
}
