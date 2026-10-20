import type { ComponentType } from "react";
import AccordionDemo from "@/registry/pane/examples/accordion-demo";
import AccordionMultiple from "@/registry/pane/examples/accordion-multiple";
import AlertDemo from "@/registry/pane/examples/alert-demo";
import AlertWithoutIcon from "@/registry/pane/examples/alert-no-icon";
import AlertTitleOnly from "@/registry/pane/examples/alert-title-only";
import AvatarWithBadge from "@/registry/pane/examples/avatar-badge";
import AvatarDemo from "@/registry/pane/examples/avatar-demo";
import AvatarSizes from "@/registry/pane/examples/avatar-sizes";
import BadgeDemo from "@/registry/pane/examples/badge-demo";
import BadgeWithIcon from "@/registry/pane/examples/badge-icon";
import BadgeTinted from "@/registry/pane/examples/badge-tinted";
import BadgeVariants from "@/registry/pane/examples/badge-variants";
import ButtonDemo from "@/registry/pane/examples/button-demo";
import ButtonIcons from "@/registry/pane/examples/button-icons";
import ButtonSize from "@/registry/pane/examples/button-size";
import ButtonTinted from "@/registry/pane/examples/button-tinted";
import ButtonVariants from "@/registry/pane/examples/button-variants";
import CardWithAction from "@/registry/pane/examples/card-action";
import CardDemo from "@/registry/pane/examples/card-demo";
import CardForm from "@/registry/pane/examples/card-form";
import CardVariants from "@/registry/pane/examples/card-variants";
import CheckboxDemo from "@/registry/pane/examples/checkbox-demo";
import CheckboxWithDescription from "@/registry/pane/examples/checkbox-description";
import CheckboxDisabled from "@/registry/pane/examples/checkbox-disabled";
import CheckboxIndeterminate from "@/registry/pane/examples/checkbox-indeterminate";
import CommandDemo from "@/registry/pane/examples/command-demo";
import DialogDemo from "@/registry/pane/examples/dialog-demo";
import DialogWithForm from "@/registry/pane/examples/dialog-form";
import DialogWithoutCloseButton from "@/registry/pane/examples/dialog-no-close";
import DropdownMenuCheckboxes from "@/registry/pane/examples/dropdown-menu-checkboxes";
import DropdownMenuDemo from "@/registry/pane/examples/dropdown-menu-demo";
import DropdownMenuRadio from "@/registry/pane/examples/dropdown-menu-radio";
import InputWithButton from "@/registry/pane/examples/input-button";
import InputDemo from "@/registry/pane/examples/input-demo";
import InputDisabled from "@/registry/pane/examples/input-disabled";
import InputWithLabel from "@/registry/pane/examples/input-label";
import NavigationMenuDemo from "@/registry/pane/examples/navigation-menu-demo";
import PaneDemo from "@/registry/pane/examples/pane-demo";
import PaneInteractive from "@/registry/pane/examples/pane-interactive";
import PaneNested from "@/registry/pane/examples/pane-nested";
import PaneRadius from "@/registry/pane/examples/pane-radius";
import PopoverAlign from "@/registry/pane/examples/popover-align";
import PopoverDemo from "@/registry/pane/examples/popover-demo";
import ProgressDemo from "@/registry/pane/examples/progress-demo";
import ProgressWithLabel from "@/registry/pane/examples/progress-label";
import RadioGroupDemo from "@/registry/pane/examples/radio-group-demo";
import RadioGroupWithDescription from "@/registry/pane/examples/radio-group-description";
import RadioGroupDisabled from "@/registry/pane/examples/radio-group-disabled";
import SelectDemo from "@/registry/pane/examples/select-demo";
import SelectDisabled from "@/registry/pane/examples/select-disabled";
import SelectGroups from "@/registry/pane/examples/select-groups";
import SelectSizes from "@/registry/pane/examples/select-sizes";
import SheetDemo from "@/registry/pane/examples/sheet-demo";
import SheetSides from "@/registry/pane/examples/sheet-sides";
import SidebarDemo from "@/registry/pane/examples/sidebar-demo";
import SliderDemo from "@/registry/pane/examples/slider-demo";
import SliderDisabled from "@/registry/pane/examples/slider-disabled";
import SliderRange from "@/registry/pane/examples/slider-range";
import SliderStep from "@/registry/pane/examples/slider-step";
import SliderVertical from "@/registry/pane/examples/slider-vertical";
import SonnerDemo from "@/registry/pane/examples/sonner-demo";
import SonnerPromise from "@/registry/pane/examples/sonner-promise";
import SonnerTypes from "@/registry/pane/examples/sonner-types";
import SwitchDemo from "@/registry/pane/examples/switch-demo";
import SwitchWithDescription from "@/registry/pane/examples/switch-description";
import SwitchDisabled from "@/registry/pane/examples/switch-disabled";
import TabsDemo from "@/registry/pane/examples/tabs-demo";
import TabsDisabled from "@/registry/pane/examples/tabs-disabled";
import TabsWithIcons from "@/registry/pane/examples/tabs-icons";
import TextareaWithButton from "@/registry/pane/examples/textarea-button";
import TextareaDemo from "@/registry/pane/examples/textarea-demo";
import TextareaDisabled from "@/registry/pane/examples/textarea-disabled";
import TextareaWithLabel from "@/registry/pane/examples/textarea-label";
import ToggleGroupDemo from "@/registry/pane/examples/toggle-group-demo";
import ToggleGroupDisabled from "@/registry/pane/examples/toggle-group-disabled";
import ToggleGroupWithIcons from "@/registry/pane/examples/toggle-group-icons";
import TooltipDemo from "@/registry/pane/examples/tooltip-demo";
import TooltipSides from "@/registry/pane/examples/tooltip-sides";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  /** file in registry/pane/examples, without the extension */
  name: string;
  demo: ComponentType;
  /** `code` spans are rendered as code */
  description?: string;
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
  /** one preview per variant or feature, under Examples */
  examples?: ComponentExample[];
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
    examples: [
      {
        title: "Radius",
        name: "pane-radius",
        demo: PaneRadius,
        description:
          "`radius` sets the corner in px. The rim, the glow and the refraction map follow it.",
      },
      {
        title: "Interactive",
        name: "pane-interactive",
        demo: PaneInteractive,
        description:
          "`interactive` adds the press feedback. Use it for any surface that can be clicked.",
      },
      {
        title: "Nested",
        name: "pane-nested",
        demo: PaneNested,
        description:
          "Glass doesn't stack, so a Pane inside another one skips its own blur and takes the lighter `--pane-nested-*` tint. It's detected for you; `nested` forces it.",
      },
    ],
    usage: `import { Pane } from "@/components/ui/pane";

export function Example() {
  return (
    <Pane radius={24} className="p-6">
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
        type: '"default" | "blur" | "transparent"',
        default: '"default"',
        description:
          "default is light, see-through glass; blur frosts the backdrop for text over a busy background; transparent keeps only the rim and the refraction.",
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
      "A glass button: plain glass by default, inverted to the theme, bare as ghost, filled with the accent as prominent, red as destructive.",
    registryName: "button",
    demo: ButtonDemo,
    usage: `import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Continue</Button>;
}`,
    examples: [
      {
        title: "Variants",
        name: "button-variants",
        demo: ButtonVariants,
        description:
          "`default` is plain glass, for most actions. `inverted` is filled with the text color, dark on light and light on dark, for a strong action that leaves the accent alone. `ghost` has no glass until it's hovered, for buttons that sit on another glass surface, like a card footer or a toolbar. `prominent` is filled with `--pane-accent`: one per screen, for the main action. `destructive` is filled with `--pane-destructive`, for actions that delete.",
      },
      {
        title: "Tinted",
        name: "button-tinted",
        demo: ButtonTinted,
        description:
          "`tinted` washes the glass in the color and moves it to the label, for a colored action that shouldn't outweigh the main one. Works with `prominent` and `destructive`.",
      },
      {
        title: "Sizes",
        name: "button-size",
        demo: ButtonSize,
        description:
          "Each size has an icon-only twin of the same height, so they line up in a toolbar.",
      },
      {
        title: "Icons",
        name: "button-icons",
        demo: ButtonIcons,
        description:
          "Icons go before or after the label and are sized by the button. An icon-only button needs an `aria-label`.",
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "inverted" | "ghost" | "prominent" | "destructive"',
        default: '"default"',
        description:
          "default is plain glass, inverted is filled with the text color, ghost has no glass until hovered, prominent takes --pane-accent, destructive --pane-destructive.",
      },
      {
        name: "tinted",
        type: "boolean",
        default: "false",
        description:
          "Washes the glass in the variant's color and colors the label, instead of filling it. For prominent and destructive.",
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
    examples: [
      {
        title: "Variants",
        name: "card-variants",
        demo: CardVariants,
        description:
          "`default` is light and see-through. `blur` frosts the backdrop, for text that sits over a busy background.",
      },
      {
        title: "With action",
        name: "card-action",
        demo: CardWithAction,
        description:
          "`CardAction` pins a control to the top right of the header. A `ghost` button keeps it from stacking glass on the card.",
      },
      {
        title: "Form",
        name: "card-form",
        demo: CardForm,
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "blur" | "transparent"',
        default: '"default"',
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
    examples: [
      {
        title: "Variants",
        name: "badge-variants",
        demo: BadgeVariants,
        description:
          "The same variants as Button: `default` is plain glass, `inverted` is filled with the text color, `prominent` with the accent, `destructive` with red.",
      },
      {
        title: "Tinted",
        name: "badge-tinted",
        demo: BadgeTinted,
        description:
          "`tinted` washes the glass in the color and moves it to the label. Works with `prominent` and `destructive`.",
      },
      {
        title: "With icon",
        name: "badge-icon",
        demo: BadgeWithIcon,
        description: "Icons are sized to the badge.",
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "inverted" | "prominent" | "destructive"',
        default: '"default"',
        description:
          "default is plain glass, inverted is filled with the text color, prominent takes --pane-accent, destructive --pane-destructive.",
      },
      {
        name: "tinted",
        type: "boolean",
        default: "false",
        description:
          "Washes the glass in the variant's color and colors the label, instead of filling it. For prominent and destructive.",
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
    examples: [
      {
        title: "With label",
        name: "input-label",
        demo: InputWithLabel,
      },
      {
        title: "With button",
        name: "input-button",
        demo: InputWithButton,
      },
      {
        title: "Disabled",
        name: "input-disabled",
        demo: InputDisabled,
      },
    ],
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
    examples: [
      {
        title: "With description",
        name: "switch-description",
        demo: SwitchWithDescription,
      },
      {
        title: "Disabled",
        name: "switch-disabled",
        demo: SwitchDisabled,
      },
    ],
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
    examples: [
      {
        title: "With icons",
        name: "tabs-icons",
        demo: TabsWithIcons,
      },
      {
        title: "Disabled",
        name: "tabs-disabled",
        demo: TabsDisabled,
        description:
          "A `disabled` trigger can't be selected and is skipped by the arrow keys.",
      },
    ],
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
    examples: [
      {
        title: "Sides",
        name: "tooltip-sides",
        demo: TooltipSides,
        description:
          "`side` picks where the tooltip opens. It flips on its own when there's no room.",
      },
    ],
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
        <Button>Hover me</Button>
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
    examples: [
      {
        title: "With form",
        name: "dialog-form",
        demo: DialogWithForm,
      },
      {
        title: "Without close button",
        name: "dialog-no-close",
        demo: DialogWithoutCloseButton,
        description:
          "`showCloseButton={false}` drops the \u00d7 in the corner, for dialogs that need an answer.",
      },
    ],
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
        <Button>Open dialog</Button>
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
    examples: [
      {
        title: "Sides",
        name: "sheet-sides",
        demo: SheetSides,
        description:
          "`side` on `SheetContent` picks the edge it slides in from.",
      },
    ],
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
        <Button>Open sheet</Button>
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
    examples: [
      {
        title: "Align",
        name: "popover-align",
        demo: PopoverAlign,
        description:
          "`align` lines the popover up with the start, center or end of its trigger.",
      },
    ],
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
        <Button>Share</Button>
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
    examples: [
      {
        title: "Checkboxes",
        name: "dropdown-menu-checkboxes",
        demo: DropdownMenuCheckboxes,
        description:
          "`DropdownMenuCheckboxItem` toggles without closing the menu.",
      },
      {
        title: "Radio group",
        name: "dropdown-menu-radio",
        demo: DropdownMenuRadio,
        description: "`DropdownMenuRadioGroup` picks one value out of several.",
      },
    ],
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
        <Button>Options</Button>
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
    examples: [
      {
        title: "Sizes",
        name: "select-sizes",
        demo: SelectSizes,
        description: "`size` on `SelectTrigger`: `sm` or `default`.",
      },
      {
        title: "Groups",
        name: "select-groups",
        demo: SelectGroups,
      },
      {
        title: "Disabled",
        name: "select-disabled",
        demo: SelectDisabled,
        description: "Disable the whole select, or single items in it.",
      },
    ],
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
    examples: [
      {
        title: "Range",
        name: "slider-range",
        demo: SliderRange,
        description: "Pass two values for two thumbs.",
      },
      {
        title: "Step",
        name: "slider-step",
        demo: SliderStep,
        description: "`step` snaps the value, here to quarters.",
      },
      {
        title: "Vertical",
        name: "slider-vertical",
        demo: SliderVertical,
        description:
          '`orientation="vertical"` stands it up. Give the parent a height.',
      },
      {
        title: "Disabled",
        name: "slider-disabled",
        demo: SliderDisabled,
      },
    ],
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
    examples: [
      {
        title: "With icons",
        name: "toggle-group-icons",
        demo: ToggleGroupWithIcons,
        description: "Icon-only items need an `aria-label`.",
      },
      {
        title: "Disabled",
        name: "toggle-group-disabled",
        demo: ToggleGroupDisabled,
      },
    ],
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
    examples: [
      {
        title: "With description",
        name: "checkbox-description",
        demo: CheckboxWithDescription,
      },
      {
        title: "Indeterminate",
        name: "checkbox-indeterminate",
        demo: CheckboxIndeterminate,
        description:
          'Pass `"indeterminate"` to `checked` when some, but not all, of the items below are selected.',
      },
      {
        title: "Disabled",
        name: "checkbox-disabled",
        demo: CheckboxDisabled,
      },
    ],
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
    examples: [
      {
        title: "With description",
        name: "radio-group-description",
        demo: RadioGroupWithDescription,
      },
      {
        title: "Disabled",
        name: "radio-group-disabled",
        demo: RadioGroupDisabled,
        description:
          "Disable a single `RadioGroupItem`, or the whole group with `disabled` on `RadioGroup`.",
      },
    ],
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
    examples: [
      {
        title: "With label",
        name: "textarea-label",
        demo: TextareaWithLabel,
      },
      {
        title: "With button",
        name: "textarea-button",
        demo: TextareaWithButton,
      },
      {
        title: "Disabled",
        name: "textarea-disabled",
        demo: TextareaDisabled,
      },
    ],
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
    examples: [
      {
        title: "With label",
        name: "progress-label",
        demo: ProgressWithLabel,
      },
    ],
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
    examples: [
      {
        title: "Title only",
        name: "alert-title-only",
        demo: AlertTitleOnly,
      },
      {
        title: "Without icon",
        name: "alert-no-icon",
        demo: AlertWithoutIcon,
        description: "Without an icon, the text takes the full width.",
      },
    ],
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
    examples: [
      {
        title: "Sizes",
        name: "avatar-sizes",
        demo: AvatarSizes,
        description: "`sm`, `default` and `lg`.",
      },
      {
        title: "With badge",
        name: "avatar-badge",
        demo: AvatarWithBadge,
        description:
          "`AvatarBadge` sits on the edge. Empty, it's a status dot; give it an icon for more.",
      },
    ],
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
    examples: [
      {
        title: "Multiple",
        name: "accordion-multiple",
        demo: AccordionMultiple,
        description:
          'With `type="multiple"` any number of sections stay open at once.',
      },
    ],
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
    examples: [
      {
        title: "Types",
        name: "sonner-types",
        demo: SonnerTypes,
        description:
          "`toast.success`, `toast.info`, `toast.warning` and `toast.error` each get their own icon.",
      },
      {
        title: "Promise",
        name: "sonner-promise",
        demo: SonnerPromise,
        description:
          "`toast.promise` shows a spinner until the promise settles, then its result.",
      },
    ],
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
