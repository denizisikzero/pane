import { Direction } from "radix-ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="اختر مدينة" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>المدن</SelectLabel>
              <SelectItem value="cairo">القاهرة</SelectItem>
              <SelectItem value="dubai">دبي</SelectItem>
              <SelectItem value="riyadh">الرياض</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Direction.Provider>
  );
}
