import { Text } from "@/components/ui/text";

export default function TextRefraction() {
  return (
    <div className="flex items-baseline gap-6 font-serif text-7xl italic">
      <Text refraction={0}>still</Text>
      <Text refraction={24}>wavy</Text>
    </div>
  );
}
