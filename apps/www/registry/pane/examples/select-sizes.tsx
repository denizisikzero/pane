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
      {(["sm", "default"] as const).map((size) => (
        <Select key={size} defaultValue="week">
          <SelectTrigger size={size} className="w-36" aria-label="Range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
