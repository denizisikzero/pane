"use client";

import * as React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type RevenuePoint,
  revenue,
} from "@/registry/pane/blocks/dashboard-01/components/dashboard-data";

const RANGES = { "90d": 90, "30d": 30, "7d": 7 } as const;
type Range = keyof typeof RANGES;

const WIDTH = 800;
const HEIGHT = 260;
const PAD = { top: 12, right: 8, bottom: 28, left: 8 };

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** A smooth path through the points: Catmull-Rom turned into cubic Béziers. */
function smooth(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function useChart(data: RevenuePoint[]) {
  return React.useMemo(() => {
    const max =
      Math.max(...data.flatMap((point) => [point.revenue, point.previous])) *
      1.1;
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const x = (i: number) =>
      PAD.left +
      (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
    const y = (value: number) => PAD.top + innerH - (value / max) * innerH;
    const current = data.map(
      (p, i) => [x(i), y(p.revenue)] as [number, number],
    );
    const previous = data.map(
      (p, i) => [x(i), y(p.previous)] as [number, number],
    );
    const line = smooth(current);
    const baseline = PAD.top + innerH;
    const area = `${line} L${x(data.length - 1)},${baseline} L${x(0)},${baseline} Z`;
    // four date labels, spread evenly
    const ticks = [0, 1, 2, 3].map((k) =>
      Math.round((k / 3) * (data.length - 1)),
    );
    return {
      x,
      current,
      line,
      area,
      previousLine: smooth(previous),
      ticks,
      baseline,
    };
  }, [data]);
}

export function ChartRevenue() {
  const [range, setRange] = React.useState<Range>("90d");
  const [hover, setHover] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const gradientId = React.useId();

  const data = revenue.slice(-RANGES[range]);
  const chart = useChart(data);
  const total = data.reduce((sum, point) => sum + point.revenue, 0);
  const totalBefore = data.reduce((sum, point) => sum + point.previous, 0);
  const change = ((total - totalBefore) / totalBefore) * 100;
  const point = hover === null ? null : data[hover];

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const innerW = WIDTH - PAD.left - PAD.right;
    const i = Math.round(((px - PAD.left) / innerW) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <Card variant="thick" radius={24} className="mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>
          {money.format(total)} in the last {RANGES[range]} days ·{" "}
          <span className="text-foreground">
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>{" "}
          on the period before
        </CardDescription>
        <CardAction>
          <ToggleGroup
            value={range}
            onValueChange={(value) => setRange(value as Range)}
          >
            {(Object.keys(RANGES) as Range[]).map((key) => (
              <ToggleGroupItem
                key={key}
                value={key}
                aria-label={`Last ${RANGES[key]} days`}
              >
                {key}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            className="h-[260px] w-full touch-none"
            role="img"
            aria-label={`Revenue over the last ${RANGES[range]} days`}
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--pane-accent)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--pane-accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={PAD.top + (chart.baseline - PAD.top) * f}
                y2={PAD.top + (chart.baseline - PAD.top) * f}
                stroke="currentColor"
                strokeOpacity={0.08}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={chart.previousLine}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
            <path d={chart.area} fill={`url(#${gradientId})`} />
            <path
              d={chart.line}
              fill="none"
              stroke="var(--pane-accent)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            {hover !== null ? (
              <line
                x1={chart.x(hover)}
                x2={chart.x(hover)}
                y1={PAD.top}
                y2={chart.baseline}
                stroke="currentColor"
                strokeOpacity={0.25}
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </svg>
          {hover !== null && point ? (
            <>
              {/* the dot lives outside the stretched svg so it stays round */}
              <span
                className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--pane-accent) ring-2 ring-background"
                style={{
                  left: `${(chart.current[hover][0] / WIDTH) * 100}%`,
                  top: `${(chart.current[hover][1] / HEIGHT) * 100}%`,
                }}
              />
              <div
                className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-[calc(12px*var(--pane-radius-scale,1))] border border-foreground/10 bg-background/80 px-3 py-2 text-xs shadow-lg backdrop-blur-md"
                style={{
                  left: `${(chart.current[hover][0] / WIDTH) * 100}%`,
                  transform:
                    hover > data.length / 2
                      ? "translateX(calc(-100% - 12px))"
                      : "translateX(12px)",
                }}
              >
                <div className="mb-1 font-medium">
                  {day.format(new Date(point.date))}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full bg-(--pane-accent)" />
                    Revenue
                  </span>
                  <span className="font-medium tabular-nums">
                    {money.format(point.revenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full bg-foreground/30" />
                    Previous period
                  </span>
                  <span className="tabular-nums">
                    {money.format(point.previous)}
                  </span>
                </div>
              </div>
            </>
          ) : null}
          <div className="mt-1 flex justify-between text-muted-foreground text-xs">
            {chart.ticks.map((i) => (
              <span key={i}>{day.format(new Date(data[i].date))}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
