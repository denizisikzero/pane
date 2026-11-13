import { Direction } from "radix-ui";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <ToggleGroup defaultValue="week" aria-label="عرض التقويم">
          <ToggleGroupItem value="day">يوم</ToggleGroupItem>
          <ToggleGroupItem value="week">أسبوع</ToggleGroupItem>
          <ToggleGroupItem value="month">شهر</ToggleGroupItem>
          <ToggleGroupItem value="year">سنة</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Direction.Provider>
  );
}
