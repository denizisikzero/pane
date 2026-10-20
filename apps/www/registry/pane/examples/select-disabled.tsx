import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Select disabled>
        <SelectTrigger className="w-44" aria-label="Plan">
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="free">
        <SelectTrigger className="w-44" aria-label="Plan">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="team" disabled>
            Team (sold out)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
