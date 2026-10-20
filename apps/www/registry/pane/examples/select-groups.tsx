import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectGroups() {
  return (
    <Select>
      <SelectTrigger className="w-52" aria-label="Time zone">
        <SelectValue placeholder="Choose a time zone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="berlin">Berlin</SelectItem>
          <SelectItem value="istanbul">Istanbul</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="tokyo">Tokyo</SelectItem>
          <SelectItem value="seoul">Seoul</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
