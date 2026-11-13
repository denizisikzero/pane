import { Direction } from "radix-ui";
import { Slider } from "@/components/ui/slider";

export default function SliderRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex w-72 flex-col gap-3">
        <span className="font-medium text-sm">مستوى الصوت</span>
        <Slider
          defaultValue={[60]}
          max={100}
          step={1}
          aria-label="مستوى الصوت"
        />
      </div>
    </Direction.Provider>
  );
}
