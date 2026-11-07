import { Text } from "@/components/ui/text";

export default function TextVariants() {
  return (
    <div className="flex flex-col items-center gap-2 font-semibold text-6xl tracking-tight">
      <Text>Regular</Text>
      <Text variant="thick">Thick</Text>
      <Text variant="thin">Thin</Text>
    </div>
  );
}
