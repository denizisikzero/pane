import { Slider } from "@/components/ui/slider";

export default function SliderDisabled() {
  return (
    <Slider
      defaultValue={[40]}
      disabled
      aria-label="Volume"
      className="w-72 max-w-full"
    />
  );
}
