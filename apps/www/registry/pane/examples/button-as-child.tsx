import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ButtonAsChild() {
  return (
    <Button variant="prominent" asChild>
      <Link href="/docs/components">Browse components</Link>
    </Button>
  );
}
