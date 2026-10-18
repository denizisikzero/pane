import {
  ArrowRightIcon,
  BluetoothIcon,
  PlaneIcon,
  WifiIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * The home page's live showcase: six small pieces of real interface, each
 * built from the components it links to, in an even grid sized to their content.
 */

function Cell({
  links,
  className,
  children,
}: {
  links: { title: string; slug: string }[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <Pane radius={28} className={cn("flex flex-col gap-4 p-5", className)}>
      <div className="flex items-center gap-3 text-xs font-medium text-foreground/70">
        {links.map(({ title, slug }) => (
          <Link
            key={slug}
            href={`/docs/components/${slug}`}
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            {title}
            <ArrowRightIcon className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </Pane>
  );
}

const settings = [
  { icon: PlaneIcon, label: "Airplane mode", on: false },
  { icon: WifiIcon, label: "Wi-Fi", on: true },
  { icon: BluetoothIcon, label: "Bluetooth", on: true },
];

function Settings() {
  return (
    <div className="flex w-full flex-col">
      {settings.map(({ icon: Icon, label, on }) => {
        const id = `home-${label.toLowerCase().replace(/\W+/g, "-")}`;
        return (
          <div
            key={label}
            className="flex items-center gap-3 border-foreground/10 border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0"
          >
            <Icon className="size-4 text-muted-foreground" />
            <label htmlFor={id} className="flex-1 text-sm font-medium">
              {label}
            </label>
            <Switch id={id} defaultChecked={on} />
          </div>
        );
      })}
    </div>
  );
}

function SignIn() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Input type="email" placeholder="Email address" aria-label="Email" />
      <Input type="password" placeholder="Password" aria-label="Password" />
      <Button variant="prominent" className="w-full">
        Sign in
      </Button>
    </div>
  );
}

const activity = [
  { value: "day", label: "Day", steps: "8,204", goal: 82 },
  { value: "week", label: "Week", steps: "61,930", goal: 88 },
  { value: "month", label: "Month", steps: "247,115", goal: 79 },
];

function Activity() {
  return (
    <Tabs defaultValue="day" className="w-full gap-4">
      <TabsList className="self-center">
        {activity.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {activity.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="flex flex-col gap-2"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-semibold tabular-nums tracking-tight">
              {tab.steps}
            </span>
            <span className="text-xs text-muted-foreground">
              {tab.goal}% of goal
            </span>
          </div>
          <Progress value={tab.goal} aria-label="Goal" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

const tasks = [
  { label: "Review the pull request", done: true },
  { label: "Update the changelog", done: true },
  { label: "Ship v0.4.0", done: false },
];

function Tasks() {
  return (
    <div className="flex w-full flex-col gap-3">
      {tasks.map(({ label, done }) => {
        const id = `home-task-${label.toLowerCase().replace(/\W+/g, "-")}`;
        return (
          <div key={label} className="flex items-center gap-3">
            <Checkbox id={id} defaultChecked={done} />
            <label htmlFor={id} className="text-sm font-medium">
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

const deploys = [
  { name: "Production", status: <Badge variant="prominent">Live</Badge> },
  {
    name: "Preview",
    status: (
      <Badge variant="prominent" tinted>
        Building
      </Badge>
    ),
  },
  {
    name: "Staging",
    status: (
      <Badge variant="destructive" tinted>
        Failed
      </Badge>
    ),
  },
];

function Deploys() {
  return (
    <div className="flex w-full flex-col gap-3">
      {deploys.map(({ name, status }) => (
        <div key={name} className="flex items-center justify-between">
          <span className="text-sm font-medium">{name}</span>
          {status}
        </div>
      ))}
    </div>
  );
}

function Invite() {
  return (
    <Card radius={22} className="w-full gap-4 py-4">
      <CardHeader className="flex items-center gap-3 px-4">
        <Avatar>
          <AvatarFallback>DI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-sm">Deniz invited you</CardTitle>
          <CardDescription>
            Join “Q4 roadmap” to edit and comment.
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="justify-end gap-2 px-4">
        <Button size="sm">Decline</Button>
        <Button variant="prominent" size="sm">
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ShowcaseGrid() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Cell links={[{ title: "Switch", slug: "switch" }]}>
        <Settings />
      </Cell>
      <Cell
        links={[
          { title: "Tabs", slug: "tabs" },
          { title: "Progress", slug: "progress" },
        ]}
      >
        <Activity />
      </Cell>
      <Cell
        links={[
          { title: "Input", slug: "input" },
          { title: "Button", slug: "button" },
        ]}
      >
        <SignIn />
      </Cell>
      <Cell links={[{ title: "Badge", slug: "badge" }]}>
        <Deploys />
      </Cell>
      <Cell links={[{ title: "Checkbox", slug: "checkbox" }]}>
        <Tasks />
      </Cell>
      <Cell
        links={[
          { title: "Card", slug: "card" },
          { title: "Avatar", slug: "avatar" },
        ]}
      >
        <Invite />
      </Cell>
    </div>
  );
}
