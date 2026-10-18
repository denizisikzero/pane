import { AtomIcon, GlobeIcon, type LucideIcon, WindIcon } from "lucide-react";

/**
 * Copy the docs pages share with their Markdown versions, so a page and what
 * an LLM reads of it can't drift apart.
 */

export const installUsage = `import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Continue</Button>;
}`;

export const requirements: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: AtomIcon,
    title: "React 19",
    description: "Components take ref as a regular prop, without forwardRef.",
  },
  {
    icon: WindIcon,
    title: "Tailwind CSS v4",
    description: "Styles are written for v4 and its CSS-first config.",
  },
  {
    icon: GlobeIcon,
    title: "Any modern browser",
    description:
      "Full refraction in Chromium; blur and highlights everywhere else.",
  },
];

// What each token does, grouped the way the material is built. Values come
// from registry.json, so a token missing here still shows up under "Other".
export const tokenGroups: { title: string; tokens: Record<string, string> }[] =
  [
    {
      title: "Surface",
      tokens: {
        "pane-fg": "Text color on glass.",
        "pane-tint-regular": "Body tint of regular glass.",
        "pane-tint-clear": "Body tint of clear glass.",
        "pane-blur-regular": "Backdrop blur behind regular glass.",
        "pane-blur-clear": "Backdrop blur behind clear glass.",
        "pane-saturation": "How much the backdrop's color is boosted.",
      },
    },
    {
      title: "Nested",
      tokens: {
        "pane-nested-regular":
          "Flat tint for regular glass inside another pane, where glass can't stack.",
        "pane-nested-clear": "Flat tint for clear glass inside another pane.",
      },
    },
    {
      title: "Overlay",
      tokens: {
        "pane-blur-overlay": "Blur of the denser Dialog and Sheet material.",
        "pane-tint-overlay": "Tint of the denser Dialog and Sheet material.",
      },
    },
    {
      title: "Edge and light",
      tokens: {
        "pane-border-width": "Width of the rim.",
        "pane-border-regular": "Rim color of regular glass.",
        "pane-border-clear": "Rim color of clear glass.",
        "pane-highlight": "Rim arcs and the pointer glint.",
        "pane-shadow": "Drop shadow under every pane.",
      },
    },
    {
      title: "Color",
      tokens: {
        "pane-accent":
          "The brand color: the prominent Button and Badge, and Switch, Checkbox, Radio Group, Slider and Progress when on.",
        "pane-accent-foreground": "Labels, checks and dots on the accent.",
        "pane-accent-opacity":
          "How much of the accent the controls mix into their glass.",
        "pane-accent-text":
          "The accent as a label on plain glass, for tinted Buttons and Badges. A deeper shade, so it reads.",
        "pane-border-accent": "Rim of a control filled with a color.",
        "pane-destructive": "Fill of a destructive Button or Badge.",
        "pane-destructive-text":
          "Label of a tinted destructive Button or Badge.",
        "pane-tinted-opacity":
          "How much color a tinted Button or Badge washes into its glass.",
        "pane-knob": "Switch and Slider knob.",
      },
    },
  ];

export const providerExample = `import { GlassConfigProvider } from "@/lib/glass/context";

export function SnappyToolbar({ children }: { children: React.ReactNode }) {
  return (
    <GlassConfigProvider
      value={{ spring: { press: { stiffness: 700, damping: 35 } } }}
    >
      {children}
    </GlassConfigProvider>
  );
}`;

export const tiers = [
  {
    name: "full",
    who: "Chrome, Edge and most Chromium browsers",
    description:
      "The complete effect: blur, saturation, edge refraction and chromatic aberration.",
  },
  {
    name: "reduced",
    who: "Safari, Firefox and everyone else",
    description:
      "Blur, saturation and the pointer-reactive highlight, without edge lensing.",
  },
  {
    name: "none",
    who: "No backdrop-filter, or reduced transparency",
    description: "A flat translucent tint with no backdrop filtering.",
  },
];
