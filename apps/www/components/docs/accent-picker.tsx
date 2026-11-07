"use client";

import * as React from "react";
import {
  AccentSwatches,
  accentScopeClass,
  accentScopeStyle,
} from "@/components/accent-swatches";
import { PreviewSurface } from "@/components/docs/preview-surface";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { type Accent, accentCss, DEFAULT_ACCENT } from "@/lib/accents";

/**
 * Pick a ready-made accent or any color, see it on every control that uses
 * it, and copy the CSS. Preset snippets are highlighted on the server and
 * handed in; a custom color's is worked out here, as plain text.
 */
export function AccentPicker({
  snippets,
}: {
  snippets: Record<string, React.ReactNode>;
}) {
  const [accent, setAccent] = React.useState<Accent>(DEFAULT_ACCENT);

  return (
    <div className="flex flex-col gap-4">
      <AccentSwatches value={accent} onValueChange={setAccent} />
      <div className={accentScopeClass} style={accentScopeStyle(accent)}>
        <PreviewSurface>
          <div className="flex w-full max-w-xs flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Button variant="prominent">Continue</Button>
              <Button variant="prominent" tinted>
                Edit
              </Button>
              <Button>Cancel</Button>
            </div>
            <div className="flex items-center gap-5">
              <Switch defaultChecked aria-label="Wi-Fi" />
              <Checkbox defaultChecked aria-label="Done" />
              <RadioGroup
                defaultValue="a"
                className="flex gap-3"
                aria-label="Choice"
              >
                <RadioGroupItem value="a" aria-label="First" />
                <RadioGroupItem value="b" aria-label="Second" />
              </RadioGroup>
            </div>
            <Slider defaultValue={[60]} aria-label="Volume" />
            <Progress value={40} aria-label="Progress" />
          </div>
        </PreviewSurface>
      </div>
      {snippets[accent] ?? (
        <pre className="overflow-x-auto rounded-[20px] border border-hairline bg-foreground/[0.02] p-5 font-mono text-[13px] leading-relaxed">
          {accentCss(accent)}
        </pre>
      )}
    </div>
  );
}
