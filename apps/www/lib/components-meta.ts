import type { ComponentType } from "react";
import AccordionDemo from "@/registry/pane/examples/accordion-demo";
import AlertDemo from "@/registry/pane/examples/alert-demo";
import AvatarDemo from "@/registry/pane/examples/avatar-demo";
import BadgeDemo from "@/registry/pane/examples/badge-demo";
import ButtonDemo from "@/registry/pane/examples/button-demo";
import CardDemo from "@/registry/pane/examples/card-demo";
import CheckboxDemo from "@/registry/pane/examples/checkbox-demo";
import CommandDemo from "@/registry/pane/examples/command-demo";
import DialogDemo from "@/registry/pane/examples/dialog-demo";
import DropdownMenuDemo from "@/registry/pane/examples/dropdown-menu-demo";
import InputDemo from "@/registry/pane/examples/input-demo";
import NavigationMenuDemo from "@/registry/pane/examples/navigation-menu-demo";
import PaneDemo from "@/registry/pane/examples/pane-demo";
import PopoverDemo from "@/registry/pane/examples/popover-demo";
import ProgressDemo from "@/registry/pane/examples/progress-demo";
import RadioGroupDemo from "@/registry/pane/examples/radio-group-demo";
import SelectDemo from "@/registry/pane/examples/select-demo";
import SheetDemo from "@/registry/pane/examples/sheet-demo";
import SidebarDemo from "@/registry/pane/examples/sidebar-demo";
import SliderDemo from "@/registry/pane/examples/slider-demo";
import SonnerDemo from "@/registry/pane/examples/sonner-demo";
import SwitchDemo from "@/registry/pane/examples/switch-demo";
import TabsDemo from "@/registry/pane/examples/tabs-demo";
import TextareaDemo from "@/registry/pane/examples/textarea-demo";
import ToggleGroupDemo from "@/registry/pane/examples/toggle-group-demo";
import TooltipDemo from "@/registry/pane/examples/tooltip-demo";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentMeta {
  slug: string;
  title: string;
  description: string;
  registryName: string;
  demo: ComponentType;
  props?: PropRow[];
  /** imports and a minimal example, shown under Usage */
  usage?: string;
  /** where the rest of the API is documented: the primitive it's built on */
  reference?: { label: string; href: string };
}

export const componentsMeta: ComponentMeta[] = [
  {
    slug: "pane",
    title: "Pane",
    description:
      "The base liquid-glass surface every component in this library is built on top of. Wrap any content in it.",
    registryName: "pane",
    demo: PaneDemo,
    usage: `import { Pane } from "@/components/ui/pane";

export function Example() {
  return (
    <Pane variant="regular" radius={24} className="p-6">
      Content on glass
    </Pane>
  );
}`,
    reference: {
      label: "motion.div",
      href: "https://motion.dev/docs/react-motion-component",
    },
    props: [
      {
        name: "variant",
        type: '"regular" | "clear"',
        default: '"regular"',
        description: "Material variant, matching Apple's HIG vocabulary.",
      },
      {
        name: "radius",
        type: "number",
        default: "28",
        description: "Corner radius in px — also feeds the refraction filter.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "Enables spring-based press/hover feedback.",
      },
      {
        name: "nested",
        type: "boolean",
        description:
          "Overrides nesting detection. Pass false on a pane rendered through a portal so it keeps its own backdrop when opened from inside another pane.",
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description:
      "A glass button: filled with the accent by default, plain glass as secondary, red as destructive.",
    registryName: "button",
    demo: ButtonDemo,
    usage: `import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Continue</Button>;
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive"',
        default: '"default"',
        description:
          "default takes --pane-accent, destructive --pane-destructive, secondary is plain glass.",
      },
      {
        name: "tinted",
        type: "boolean",
        default: "false",
        description:
          "Washes the glass in the variant's color and colors the label, instead of filling it. For default and destructive.",
      },
      {
        name: "size",
        type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        default: '"default"',
        description: "Button size.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Merge props onto the child element instead of rendering a <button>.",
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    description: "A glass panel with header, content and footer slots.",
    registryName: "card",
    demo: CardDemo,
    props: [
      {
        name: "variant",
        type: '"regular" | "clear"',
        default: '"clear"',
        description: "Glass material of the card.",
      },
      {
        name: "radius",
        type: "number",
        default: "24",
        description: "Corner radius in px.",
      },
    ],
    usage: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>Unlock every component.</CardDescription>
      </CardHeader>
      <CardContent>Billed annually.</CardContent>
      <CardFooter>Cancel anytime.</CardFooter>
    </Card>
  );
}`,
  },
  {
    slug: "badge",
    title: "Badge",
    description: "A small glass pill for labels and statuses.",
    registryName: "badge",
    demo: BadgeDemo,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive"',
        default: '"default"',
        description:
          "default takes --pane-accent, destructive --pane-destructive, secondary is plain glass.",
      },
      {
        name: "tinted",
        type: "boolean",
        default: "false",
        description:
          "Washes the glass in the variant's color and colors the label, instead of filling it. For default and destructive.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Merge props onto the child element, for a badge that is a link.",
      },
    ],
    usage: `import { Badge } from "@/components/ui/badge";

export function Example() {
  return <Badge>New</Badge>;
}`,
  },
  {
    slug: "input",
    title: "Input",
    description: "A text input rendered on a glass surface.",
    registryName: "input",
    demo: InputDemo,
    usage: `import { Input } from "@/components/ui/input";

export function Example() {
  return <Input type="email" placeholder="Email address" />;
}`,
    reference: {
      label: "the native <input>",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
    },
  },
  {
    slug: "switch",
    title: "Switch",
    description: "A toggle with a sliding glass thumb.",
    registryName: "switch",
    demo: SwitchDemo,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "The on state, when controlled.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "The initial on state, when uncontrolled.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Called when the switch is toggled.",
      },
    ],
    usage: `import { Switch } from "@/components/ui/switch";

export function Example() {
  return <Switch id="airplane-mode" />;
}`,
    reference: {
      label: "Radix Switch",
      href: "https://www.radix-ui.com/primitives/docs/components/switch",
    },
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "A segmented control with a sliding glass indicator.",
    registryName: "tabs",
    demo: TabsDemo,
    props: [
      {
        name: "value",
        type: "string",
        description: "The active tab, when controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The initially active tab, when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Called with the newly active tab.",
      },
    ],
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Example() {
  return (
    <Tabs defaultValue="music">
      <TabsList>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
      </TabsList>
      <TabsContent value="music">Your library.</TabsContent>
      <TabsContent value="photos">Your photos.</TabsContent>
    </Tabs>
  );
}`,
    reference: {
      label: "Radix Tabs",
      href: "https://www.radix-ui.com/primitives/docs/components/tabs",
    },
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "A small glass popover for contextual hints.",
    registryName: "tooltip",
    demo: TooltipDemo,
    props: [
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"top"',
        description: "On TooltipContent: where the tooltip opens.",
      },
      {
        name: "sideOffset",
        type: "number",
        default: "8",
        description: "On TooltipContent: distance from the trigger in px.",
      },
    ],
    usage: `import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Example() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Saved to your library</TooltipContent>
    </Tooltip>
  );
}`,
    reference: {
      label: "Radix Tooltip",
      href: "https://www.radix-ui.com/primitives/docs/components/tooltip",
    },
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "A modal glass panel over a blurred scrim.",
    registryName: "dialog",
    demo: DialogDemo,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "On Dialog: whether it is open, when controlled.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "On Dialog: called when it opens or closes.",
      },
      {
        name: "showCloseButton",
        type: "boolean",
        default: "true",
        description:
          "On DialogContent: show the round close button in the corner.",
      },
    ],
    usage: `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>This action can't be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
    reference: {
      label: "Radix Dialog",
      href: "https://www.radix-ui.com/primitives/docs/components/dialog",
    },
  },
  {
    slug: "sheet",
    title: "Sheet",
    description: "A directional slide-over glass panel.",
    registryName: "sheet",
    demo: SheetDemo,
    props: [
      {
        name: "side",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"right"',
        description: "On SheetContent: the edge the sheet slides in from.",
      },
      {
        name: "open",
        type: "boolean",
        description: "On Sheet: whether it is open, when controlled.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "On Sheet: called when it opens or closes.",
      },
    ],
    usage: `import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Manage how Pane reaches you.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`,
    reference: {
      label: "Radix Dialog",
      href: "https://www.radix-ui.com/primitives/docs/components/dialog",
    },
  },
  {
    slug: "popover",
    title: "Popover",
    description: "A floating glass panel anchored to a trigger.",
    registryName: "popover",
    demo: PopoverDemo,
    props: [
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"center"',
        description: "On PopoverContent: alignment against the trigger.",
      },
      {
        name: "sideOffset",
        type: "number",
        default: "8",
        description: "On PopoverContent: distance from the trigger in px.",
      },
    ],
    usage: `import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent>Anyone with the link can view.</PopoverContent>
    </Popover>
  );
}`,
    reference: {
      label: "Radix Popover",
      href: "https://www.radix-ui.com/primitives/docs/components/popover",
    },
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description:
      "A glass menu with checkbox and radio items, shortcuts and submenus.",
    registryName: "dropdown-menu",
    demo: DropdownMenuDemo,
    usage: `import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    reference: {
      label: "Radix Dropdown Menu",
      href: "https://www.radix-ui.com/primitives/docs/components/dropdown-menu",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "Set on DropdownMenuItem to color a destructive action.",
      },
      {
        name: "inset",
        type: "boolean",
        default: "false",
        description:
          "Set on an item, label or sub-trigger to align it with checkbox and radio items.",
      },
    ],
  },
  {
    slug: "select",
    title: "Select",
    description: "A glass field that opens a glass list of options.",
    registryName: "select",
    demo: SelectDemo,
    usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choose a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="berlin">Berlin</SelectItem>
        <SelectItem value="tokyo">Tokyo</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
    reference: {
      label: "Radix Select",
      href: "https://www.radix-ui.com/primitives/docs/components/select",
    },
    props: [
      {
        name: "size",
        type: '"default" | "sm"',
        default: '"default"',
        description: "Set on SelectTrigger.",
      },
      {
        name: "position",
        type: '"popper" | "item-aligned"',
        default: '"popper"',
        description:
          "Set on SelectContent. Popper floats the list below the trigger; item-aligned lays it over the trigger like a native macOS menu.",
      },
    ],
  },
  {
    slug: "slider",
    title: "Slider",
    description: "A glass track with a knob that turns to glass while dragged.",
    registryName: "slider",
    demo: SliderDemo,
    props: [
      {
        name: "value",
        type: "number[]",
        description:
          "Thumb positions, when controlled. Two values make a range.",
      },
      {
        name: "defaultValue",
        type: "number[]",
        description: "Initial thumb positions, when uncontrolled.",
      },
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Lowest value.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Highest value.",
      },
      {
        name: "step",
        type: "number",
        default: "1",
        description: "Distance between values.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Direction of the track.",
      },
    ],
    usage: `import { Slider } from "@/components/ui/slider";

export function Example() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}`,
    reference: {
      label: "Radix Slider",
      href: "https://www.radix-ui.com/primitives/docs/components/slider",
    },
  },
  {
    slug: "toggle-group",
    title: "Toggle Group",
    description:
      "A single-choice control with a glass indicator that springs between segments.",
    registryName: "toggle-group",
    demo: ToggleGroupDemo,
    usage: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Example() {
  return (
    <ToggleGroup defaultValue="week">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
    reference: {
      label: "Radix Toggle Group",
      href: "https://www.radix-ui.com/primitives/docs/components/toggle-group",
    },
    props: [
      {
        name: "value",
        type: "string",
        description: "The selected segment, when controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The initially selected segment, when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description:
          "Called with the new segment. Never called with an empty value — one segment is always selected.",
      },
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description:
      "A glass circle that fills with the accent and shows a check when checked.",
    registryName: "checkbox",
    demo: CheckboxDemo,
    props: [
      {
        name: "checked",
        type: 'boolean | "indeterminate"',
        description: "The checked state, when controlled.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "The initial state, when uncontrolled.",
      },
      {
        name: "onCheckedChange",
        type: '(checked: boolean | "indeterminate") => void',
        description: "Called when the checkbox is toggled.",
      },
    ],
    usage: `import { Checkbox } from "@/components/ui/checkbox";

export function Example() {
  return <Checkbox id="terms" />;
}`,
    reference: {
      label: "Radix Checkbox",
      href: "https://www.radix-ui.com/primitives/docs/components/checkbox",
    },
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    description: "A set of glass circles where one fills with the accent.",
    registryName: "radio-group",
    demo: RadioGroupDemo,
    props: [
      {
        name: "value",
        type: "string",
        description: "On RadioGroup: the selected item, when controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description:
          "On RadioGroup: the initially selected item, when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "On RadioGroup: called with the newly selected item.",
      },
    ],
    usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Example() {
  return (
    <RadioGroup defaultValue="comfortable">
      <RadioGroupItem value="default" aria-label="Default" />
      <RadioGroupItem value="comfortable" aria-label="Comfortable" />
    </RadioGroup>
  );
}`,
    reference: {
      label: "Radix Radio Group",
      href: "https://www.radix-ui.com/primitives/docs/components/radio-group",
    },
  },
  {
    slug: "textarea",
    title: "Textarea",
    description:
      "A multi-line text field on glass that grows with its content.",
    registryName: "textarea",
    demo: TextareaDemo,
    usage: `import { Textarea } from "@/components/ui/textarea";

export function Example() {
  return <Textarea placeholder="Type your message here." />;
}`,
    reference: {
      label: "the native <textarea>",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea",
    },
  },
  {
    slug: "progress",
    title: "Progress",
    description: "A glass track with an accent fill that eases to each value.",
    registryName: "progress",
    demo: ProgressDemo,
    usage: `import { Progress } from "@/components/ui/progress";

export function Example() {
  return <Progress value={33} />;
}`,
    reference: {
      label: "Radix Progress",
      href: "https://www.radix-ui.com/primitives/docs/components/progress",
    },
    props: [
      {
        name: "value",
        type: "number | null",
        description:
          "Progress from 0 to 100. Leave it null for an indeterminate state.",
      },
    ],
  },
  {
    slug: "alert",
    title: "Alert",
    description: "A glass callout with an icon, title and description.",
    registryName: "alert",
    demo: AlertDemo,
    usage: `import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Example() {
  return (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Your changes have been saved</AlertTitle>
      <AlertDescription>Everyone on the project can see them now.</AlertDescription>
    </Alert>
  );
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "Visual emphasis.",
      },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    description:
      "A glass circle with an image or initials, alone or in a group.",
    registryName: "avatar",
    demo: AvatarDemo,
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}`,
    reference: {
      label: "Radix Avatar",
      href: "https://www.radix-ui.com/primitives/docs/components/avatar",
    },
    props: [
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        default: '"default"',
        description: "Diameter of the circle.",
      },
    ],
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "Collapsible sections on one shared glass surface.",
    registryName: "accordion",
    demo: AccordionDemo,
    usage: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    reference: {
      label: "Radix Accordion",
      href: "https://www.radix-ui.com/primitives/docs/components/accordion",
    },
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        description: "Whether one or several items can be open at once.",
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "false",
        description: 'With type="single", lets the open item be closed again.',
      },
    ],
  },
  {
    slug: "sonner",
    title: "Sonner",
    description: "Toast notifications on the dense glass overlay material.",
    registryName: "sonner",
    demo: SonnerDemo,
    usage: `// app/layout.tsx — render the toaster once
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// anywhere else — show a toast
import { toast } from "sonner";

toast("Event has been created");`,
    reference: {
      label: "Sonner",
      href: "https://sonner.emilkowal.ski",
    },
  },
  {
    slug: "command",
    title: "Command",
    description: "A searchable command menu on glass, inline or in a dialog.",
    registryName: "command",
    demo: CommandDemo,
    props: [
      {
        name: "title",
        type: "string",
        default: '"Command Palette"',
        description: "On CommandDialog: title read out by screen readers.",
      },
      {
        name: "description",
        type: "string",
        default: '"Search for a command to run..."',
        description:
          "On CommandDialog: description read out by screen readers.",
      },
      {
        name: "showCloseButton",
        type: "boolean",
        default: "true",
        description: "On CommandDialog: show the dialog's close button.",
      },
    ],
    usage: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Example() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`,
    reference: {
      label: "cmdk",
      href: "https://cmdk.paco.me",
    },
  },
  {
    slug: "navigation-menu",
    title: "Navigation Menu",
    description:
      "Site navigation with panels that open on a shared glass viewport.",
    registryName: "navigation-menu",
    demo: NavigationMenuDemo,
    usage: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Introduction</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`,
    reference: {
      label: "Radix Navigation Menu",
      href: "https://www.radix-ui.com/primitives/docs/components/navigation-menu",
    },
    props: [
      {
        name: "viewport",
        type: "boolean",
        default: "true",
        description:
          "Share one glass viewport between panels. With false, each panel floats on its own glass under its trigger.",
      },
    ],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    description:
      "A collapsible glass sidebar with a sliding pill on the active item.",
    registryName: "sidebar",
    demo: SidebarDemo,
    usage: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}`,
    reference: {
      label: "shadcn/ui Sidebar",
      href: "https://ui.shadcn.com/docs/components/sidebar",
    },
    props: [
      {
        name: "variant",
        type: '"sidebar" | "floating" | "inset"',
        default: '"sidebar"',
        description:
          "Edge-to-edge glass column, or a rounded pane inset from the edge.",
      },
      {
        name: "collapsible",
        type: '"offcanvas" | "icon" | "none"',
        default: '"offcanvas"',
        description: "Slide fully out, shrink to icons, or stay put.",
      },
      {
        name: "side",
        type: '"left" | "right"',
        default: '"left"',
        description: "Which edge of the window it sits on.",
      },
    ],
  },
];

export function getComponentMeta(slug: string) {
  return componentsMeta.find((component) => component.slug === slug);
}
