import { Slider } from "@/components/ui/slider";

export default function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 75]}
      aria-label="Price range"
      className="w-72 max-w-full"
    />
  );
}
