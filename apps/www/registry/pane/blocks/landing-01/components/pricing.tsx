"use client";

import { CheckIcon, ChevronDownIcon, InfoIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  type Currency,
  currencies,
  engagements,
} from "@/registry/pane/blocks/landing-01/components/studio-data";

/**
 * `asChild` as a spread, not a literal attribute: `shadcn add` rewrites a
 * literal one into a `render` prop for Base UI styles, which these Radix
 * triggers would ignore. See CONTRIBUTING.md.
 */
const asChild = { asChild: true } as const;

type Kind = keyof typeof engagements;

/** Fixed-scope sprints or a monthly retainer, priced in the visitor's currency. */
export function Pricing() {
  const [kind, setKind] = React.useState<Kind>("sprint");
  const [currency, setCurrency] = React.useState<Currency>("usd");
  const { symbol, rate, label } = currencies[currency];
  const price = (usd: number) =>
    `${symbol}${(Math.round((usd * rate) / 500) * 500).toLocaleString("en-US")}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ToggleGroup
          value={kind}
          onValueChange={(value) => value && setKind(value as Kind)}
          aria-label="Engagement"
        >
          <ToggleGroupItem value="sprint">Sprints</ToggleGroupItem>
          <ToggleGroupItem value="retainer">Retainers</ToggleGroupItem>
        </ToggleGroup>
        <DropdownMenu>
          <DropdownMenuTrigger {...asChild}>
            <Button variant="ghost" size="sm">
              {label}
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Currency</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={currency}
              onValueChange={(value) => setCurrency(value as Currency)}
            >
              {(Object.keys(currencies) as Currency[]).map((key) => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {currencies[key].label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {engagements[kind].map((plan) => (
          <Card
            key={plan.name}
            variant={plan.featured ? "thick" : "regular"}
            radius={24}
            className={cn(plan.featured && "md:-my-2 md:py-8")}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.featured ? (
                  <Badge variant="inverted">Most booked</Badge>
                ) : null}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-3xl tabular-nums tracking-tight">
                  {price(plan.price)}
                </span>
                <span className="text-muted-foreground text-sm">
                  {plan.unit}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckIcon className="size-4 shrink-0 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                {...asChild}
                variant={plan.featured ? "inverted" : "default"}
                className="flex-1"
              >
                <a href="#contact">Book {plan.name.toLowerCase()}</a>
              </Button>
              <Popover>
                <PopoverTrigger {...asChild}>
                  <Button size="icon" variant="ghost" aria-label="Terms">
                    <InfoIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 text-sm">
                  Half up front, half on delivery. Prices exclude VAT; we
                  invoice in {label}.
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
