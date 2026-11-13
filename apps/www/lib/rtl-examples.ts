import type { ComponentType } from "react";
import AccordionRtl from "@/registry/pane/examples/accordion-rtl";
import AlertRtl from "@/registry/pane/examples/alert-rtl";
import AvatarRtl from "@/registry/pane/examples/avatar-rtl";
import BadgeRtl from "@/registry/pane/examples/badge-rtl";
import ButtonRtl from "@/registry/pane/examples/button-rtl";
import CardRtl from "@/registry/pane/examples/card-rtl";
import CheckboxRtl from "@/registry/pane/examples/checkbox-rtl";
import CommandRtl from "@/registry/pane/examples/command-rtl";
import DialogRtl from "@/registry/pane/examples/dialog-rtl";
import DropdownMenuRtl from "@/registry/pane/examples/dropdown-menu-rtl";
import InputRtl from "@/registry/pane/examples/input-rtl";
import NavigationMenuRtl from "@/registry/pane/examples/navigation-menu-rtl";
import PaneRtl from "@/registry/pane/examples/pane-rtl";
import PopoverRtl from "@/registry/pane/examples/popover-rtl";
import ProgressRtl from "@/registry/pane/examples/progress-rtl";
import RadioGroupRtl from "@/registry/pane/examples/radio-group-rtl";
import SelectRtl from "@/registry/pane/examples/select-rtl";
import SheetRtl from "@/registry/pane/examples/sheet-rtl";
import SidebarRtl from "@/registry/pane/examples/sidebar-rtl";
import SliderRtl from "@/registry/pane/examples/slider-rtl";
import SwitchRtl from "@/registry/pane/examples/switch-rtl";
import TabsRtl from "@/registry/pane/examples/tabs-rtl";
import TextRtl from "@/registry/pane/examples/text-rtl";
import TextareaRtl from "@/registry/pane/examples/textarea-rtl";
import ToggleGroupRtl from "@/registry/pane/examples/toggle-group-rtl";
import TooltipRtl from "@/registry/pane/examples/tooltip-rtl";

/** Each component in right-to-left, keyed by registry name, shown under RTL. */
export const rtlExamples: Record<string, ComponentType> = {
  accordion: AccordionRtl,
  alert: AlertRtl,
  avatar: AvatarRtl,
  badge: BadgeRtl,
  button: ButtonRtl,
  card: CardRtl,
  checkbox: CheckboxRtl,
  command: CommandRtl,
  dialog: DialogRtl,
  "dropdown-menu": DropdownMenuRtl,
  input: InputRtl,
  "navigation-menu": NavigationMenuRtl,
  pane: PaneRtl,
  popover: PopoverRtl,
  progress: ProgressRtl,
  "radio-group": RadioGroupRtl,
  select: SelectRtl,
  sheet: SheetRtl,
  sidebar: SidebarRtl,
  slider: SliderRtl,
  switch: SwitchRtl,
  tabs: TabsRtl,
  text: TextRtl,
  textarea: TextareaRtl,
  "toggle-group": ToggleGroupRtl,
  tooltip: TooltipRtl,
};

export const rtlExampleNote =
  'The same component in Arabic, inside `dir="rtl"` and Radix\'s `Direction.Provider`.';
