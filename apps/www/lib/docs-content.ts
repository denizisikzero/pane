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
      "Refraction in Chromium, and with WebGPU inside a GlassScene; blur and rim light everywhere else.",
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
        "pane-tint-thick": "Body tint of thick glass.",
        "pane-tint-thin":
          "Body tint of thin glass: none, so the backdrop shows as is.",
        "pane-blur-regular": "Backdrop blur behind regular glass.",
        "pane-blur-thick": "Backdrop blur behind thick glass.",
        "pane-blur-thin": "Backdrop blur behind thin glass: none.",
        "pane-saturation": "How much the backdrop's color is boosted.",
      },
    },
    {
      title: "Nested",
      tokens: {
        "pane-nested-regular":
          "Flat tint for regular glass inside another pane, where glass can't stack.",
        "pane-nested-thick": "Flat tint for thick glass inside another pane.",
        "pane-nested-thin": "Flat tint for thin glass inside another pane.",
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
        "pane-border-width":
          "Width of the hairline around every pane. 0 removes it.",
        "pane-rim":
          "Strength of the glowing rim, the light catching the edge: 1 as designed, 0 leaves only the hairline.",
        "pane-radius-scale":
          "Multiplies every corner radius: 1 as designed, 0 square. Pills and circles stay round.",
        "pane-border-regular": "Rim color of regular glass.",
        "pane-border-thick": "Rim color of thick glass.",
        "pane-border-thin": "Rim color of thin glass.",
        "pane-highlight": "Rim arcs and the inner edge glow.",
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

export const sceneExample = `import * as React from "react";
import { Card } from "@/components/ui/card";
import { GlassScene } from "@/lib/glass/gpu/scene";

export function Hero() {
  const video = React.useRef<HTMLVideoElement>(null);
  return (
    <GlassScene source={video}>
      <div className="relative">
        <video ref={video} src="/hero.mp4" autoPlay muted loop playsInline
          className="absolute inset-0 size-full object-cover" />
        <Card>…</Card>
      </div>
    </GlassScene>
  );
}`;

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
      "Blur, saturation and the pointer-reactive rim light, without edge lensing.",
  },
  {
    name: "none",
    who: "No backdrop-filter, or reduced transparency",
    description: "A flat translucent tint with no backdrop filtering.",
  },
];

// Introduction

export const introSections: { title: string; body: string[] }[] = [
  {
    title: "What is this?",
    body: [
      "Apple's liquid glass is a material, not a blur: light bends at the rim, the edge catches the light, and the surface gives under your finger. Pane brings that material to the web as components you already know (Button, Card, Dialog, Sidebar and the rest), with the same API shape as shadcn/ui.",
    ],
  },
  {
    title: "You own the code",
    body: [
      "Pane is not an npm package. The shadcn CLI copies each component, the glass engine and its tokens into your project, so you can read every line, change it, and never wait on a release to fix something.",
    ],
  },
  {
    title: "Three renderers",
    body: [
      "Pane checks what the browser can do and draws the best glass it can: a WebGPU lens inside a GlassScene, an SVG refraction filter in Chromium, and blur with rim light everywhere else. The components and their props are the same in all three.",
    ],
  },
  {
    title: "Browser support",
    body: [
      "Every modern browser. Refraction needs Chromium or WebGPU; Safari and Firefox get the CSS glass outside a GlassScene. People who ask the system for reduced transparency get a flat tint.",
    ],
  },
];

// Rendering

export const renderers = [
  {
    name: "WebGPU lens",
    where: "Inside a GlassScene",
    browsers: "Chrome, Edge 113+, Safari 26+, Firefox 141+",
    refraction: "Shader lens with dispersion",
    source: "The video, image or canvas you pass",
    cost: "One GPU pass per pane, only inside the scene",
  },
  {
    name: "SVG refraction",
    where: "Everywhere else, by default",
    browsers: "Chrome, Edge and other Chromium browsers",
    refraction: "Displacement map at the rim",
    source: "Whatever the page painted behind the pane",
    cost: "A filter per pane; skipped on tiny surfaces",
  },
  {
    name: "CSS glass",
    where: "The fallback",
    browsers: "Safari, Firefox, and any browser without the above",
    refraction: "None, only blur, saturation and rim light",
    source: "Whatever the page painted behind the pane",
    cost: "One backdrop-filter",
  },
];

// MCP

export const registryConfig = `{
  "registries": {
    "@pane": "https://pane.theui.company/r/{name}.json"
  }
}`;

export const mcpClients = [
  {
    name: "Claude Code",
    command: "npx shadcn@latest mcp init --client claude",
    after:
      "Restart Claude Code, then run /mcp to check that the shadcn server is connected.",
  },
  {
    name: "Cursor",
    command: "npx shadcn@latest mcp init --client cursor",
    after: "Open Cursor Settings → MCP and enable the shadcn server.",
  },
  {
    name: "VS Code",
    command: "npx shadcn@latest mcp init --client vscode",
    after:
      "Open .vscode/mcp.json and click Start next to the shadcn server, then use Copilot in agent mode.",
  },
];

export const mcpPrompts = [
  "Show me the components in the @pane registry",
  "Add a glass Card with a Switch to the settings page using @pane",
  "Install the landing-01 block from @pane and swap the copy for my product",
  "Replace the shadcn Button in the header with the @pane Button",
];
