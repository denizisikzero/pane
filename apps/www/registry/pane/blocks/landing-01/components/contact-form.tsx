"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/registry/pane/blocks/landing-01/components/studio-data";

const label = "font-medium text-sm";

/**
 * The project brief: who, what, when and how much. Submitting it shows a
 * toast — wire `onSubmit` to your inbox. `id` keeps the field ids unique
 * when the form appears twice on a page.
 */
export function ContactForm({
  id,
  onSent,
}: {
  id: string;
  onSent?: () => void;
}) {
  const [budget, setBudget] = React.useState(40);
  const [agreed, setAgreed] = React.useState(false);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const name = new FormData(event.currentTarget).get("name");
        toast("Brief received", {
          description: `Thanks${name ? `, ${name}` : ""} — we reply within a day.`,
        });
        event.currentTarget.reset();
        setAgreed(false);
        onSent?.();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className={label}>
            Name
          </label>
          <Input
            id={`${id}-name`}
            name="name"
            placeholder="Ada Lovelace"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className={label}>
            Email
          </label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            placeholder="ada@example.com"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className={label}>What do you need?</span>
        <Select name="service" defaultValue={services[0].title}>
          <SelectTrigger className="w-full" aria-label="Service">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.title} value={service.title}>
                {service.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <span className={label}>When should we start?</span>
        <RadioGroup
          name="start"
          defaultValue="month"
          className="flex flex-wrap gap-4"
        >
          {[
            { value: "now", title: "Right away" },
            { value: "month", title: "Next month" },
            { value: "later", title: "Just exploring" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={`${id}-start-${option.value}`}
              />
              <label
                htmlFor={`${id}-start-${option.value}`}
                className="text-sm"
              >
                {option.title}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className={label}>Budget</span>
          <span className="text-muted-foreground text-sm tabular-nums">
            {budget >= 150 ? "$150k+" : `$${budget}k`}
          </span>
        </div>
        <Slider
          value={[budget]}
          onValueChange={([next]) => setBudget(next)}
          min={10}
          max={150}
          step={5}
          aria-label="Budget"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-brief`} className={label}>
          Tell us about it
        </label>
        <Textarea
          id={`${id}-brief`}
          name="brief"
          rows={3}
          placeholder="What you're building, and what's in the way."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <label htmlFor={`${id}-deck`} className="text-sm">
          Send me the studio deck
        </label>
        <Switch id={`${id}-deck`} name="deck" defaultChecked />
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id={`${id}-nda`}
          checked={agreed}
          onCheckedChange={(value) => setAgreed(value === true)}
        />
        <label
          htmlFor={`${id}-nda`}
          className="text-muted-foreground text-sm leading-snug"
        >
          Sign an NDA before we talk
        </label>
      </div>

      <Button type="submit" variant="inverted" className="w-full">
        Send the brief
      </Button>
    </form>
  );
}
