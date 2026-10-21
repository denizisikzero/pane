import { Slider } from "@/components/ui/slider";

export default function SliderVertical() {
  return (
    <div className="flex h-44 items-center gap-8">
      <Slider defaultValue={[70]} orientation="vertical" aria-label="Volume" />
      <Slider
        defaultValue={[40]}
        orientation="vertical"
        aria-label="Brightness"
      />
    </div>
  );
}
