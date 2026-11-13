import { Direction } from "radix-ui";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-80 max-w-full">
        <Textarea placeholder="اكتب رسالتك هنا." />
      </div>
    </Direction.Provider>
  );
}
