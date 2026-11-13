import { Direction } from "radix-ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="radio-rtl-default" />
            <label htmlFor="radio-rtl-default" className="font-medium text-sm">
              افتراضي
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="radio-rtl-comfortable" />
            <label
              htmlFor="radio-rtl-comfortable"
              className="font-medium text-sm"
            >
              مريح
            </label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="radio-rtl-compact" />
            <label htmlFor="radio-rtl-compact" className="font-medium text-sm">
              مضغوط
            </label>
          </div>
        </RadioGroup>
      </div>
    </Direction.Provider>
  );
}
