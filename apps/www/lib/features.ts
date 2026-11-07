import {
  CodeIcon,
  type LucideIcon,
  MousePointer2Icon,
  SparklesIcon,
  WavesIcon,
} from "lucide-react";

/** What sets the material apart — shown on the home page and in the docs. */
export const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: SparklesIcon,
    title: "Real refraction",
    description:
      "The rim bends the backdrop like a lens, with a touch of chromatic aberration — an SVG filter in Chromium, a WebGPU shader over a GlassScene. Not just a blurred background.",
  },
  {
    icon: MousePointer2Icon,
    title: "Light that follows",
    description:
      "The rim catches the light from the pointer, and swings it around the edge as the surface moves through the page.",
  },
  {
    icon: WavesIcon,
    title: "Spring physics",
    description:
      "Presses, hovers and sliding indicators move on springs, tuned from a single config file.",
  },
  {
    icon: CodeIcon,
    title: "Your code",
    description:
      "Not an npm package. The shadcn CLI copies each component into your project, so you can read it and change it.",
  },
];
