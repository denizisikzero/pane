import { Button } from "@/components/ui/button";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="inverted">Inverted</Button>
      <Button variant="prominent">Prominent</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
