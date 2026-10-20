import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Select defaultValue="week">
        <SelectTrigger size="sm" className="w-36" aria-label="Range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Today</SelectItem>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="month">This month</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="week">
        <SelectTrigger className="w-36" aria-label="Range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Today</SelectItem>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="month">This month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
