export const siteConfig = {
  name: "Pane",
  tagline: "Liquid glass components for React.",
  description:
    "Liquid glass components for React: a shadcn registry that recreates Apple's material with real refraction, rim light and spring physics. Install with the shadcn CLI and own the code.",
  author: { name: "Deniz Isik", url: "https://github.com/denizisikzero" },
  links: {
    github: "https://github.com/denizisikzero/pane",
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://pane.theui.company";
}

export interface NavItem {
  title: string;
  href: string;
  /** shown in the mobile menu only — on desktop the header already links it */
  mobileOnly?: boolean;
}

export const docsNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Rendering", href: "/docs/rendering" },
      { title: "MCP", href: "/docs/mcp" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Browse all", href: "/docs/components" },
      { title: "Pane", href: "/docs/components/pane" },
      { title: "Text", href: "/docs/components/text" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Sonner", href: "/docs/components/sonner" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Progress", href: "/docs/components/progress" },
    ],
  },
];
