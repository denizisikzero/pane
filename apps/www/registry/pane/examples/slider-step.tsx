import { Slider } from "@/components/ui/slider";

export default function SliderStep() {
  return (
    <Slider
      defaultValue={[50]}
      step={25}
      aria-label="Quality"
      className="w-72 max-w-full"
    />
  );
}
