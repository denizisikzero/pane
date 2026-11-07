import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardVariants() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Regular</CardTitle>
          <CardDescription>The default: light and see-through.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="thick">
        <CardHeader>
          <CardTitle>Thick</CardTitle>
          <CardDescription>
            Frostier, for text over a busy background.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
