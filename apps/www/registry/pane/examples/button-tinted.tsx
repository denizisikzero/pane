import { Button } from "@/components/ui/button";

export default function ButtonTinted() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="prominent" tinted>
        Tinted
      </Button>
      <Button variant="destructive" tinted>
        Delete
      </Button>
    </div>
  );
}
