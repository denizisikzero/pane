import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats } from "@/registry/pane/blocks/dashboard-01/components/dashboard-data";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
      {stats.map((stat) => {
        const up = stat.change >= 0;
        const good = up !== Boolean(stat.lowerIsBetter);
        const Trend = up ? TrendingUpIcon : TrendingDownIcon;
        return (
          <Card key={stat.title} radius={22} className="gap-4">
            <CardHeader>
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="font-semibold text-3xl tabular-nums tracking-tight">
                {stat.value}
              </CardTitle>
              <CardAction>
                <Badge variant={good ? "prominent" : "destructive"} tinted>
                  <Trend />
                  {up ? "+" : ""}
                  {stat.change}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              {stat.note}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
