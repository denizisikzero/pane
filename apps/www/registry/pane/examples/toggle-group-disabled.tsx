import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup defaultValue="standard" aria-label="Video quality">
      <ToggleGroupItem value="standard">Standard</ToggleGroupItem>
      <ToggleGroupItem value="hd">HD</ToggleGroupItem>
      <ToggleGroupItem value="4k" disabled>
        4K
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
