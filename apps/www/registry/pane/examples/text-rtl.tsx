import { Direction } from "radix-ui";
import { Text } from "@/components/ui/text";

export default function TextRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Text className="font-semibold text-7xl sm:text-8xl">زجاج</Text>
      </div>
    </Direction.Provider>
  );
}
