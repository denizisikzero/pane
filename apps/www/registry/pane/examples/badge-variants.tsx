import { Badge } from "@/components/ui/badge";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="inverted">Inverted</Badge>
      <Badge variant="prominent">Prominent</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
