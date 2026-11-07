/**
 * Everything the studio site says, in one place. The images are the Pane
 * site's own renders, from /previews, each in a light and a dark version —
 * swap them for your work.
 */

import type { ThemedSrc } from "@/registry/pane/blocks/landing-01/components/themed-image";

const render = (name: string): ThemedSrc => ({
  light: `/previews/${name}-light.jpg`,
  dark: `/previews/${name}-dark.jpg`,
});

export const images = {
  hero: render("silk"),
  contact: render("chrome"),
};

export const services = [
  {
    title: "Product design",
    href: "#services",
    description: "Apps and tools, from the first flow to the shipped build.",
    detail:
      "We map the job your product does, design the flows that do it, and stay through the build so what ships is what we drew.",
  },
  {
    title: "Design systems",
    href: "#services",
    description: "Tokens, components and docs your team keeps using.",
    detail:
      "A system is only done when the team reaches for it. We build the tokens, the components in code and the docs, then hand them over in person.",
  },
  {
    title: "Brand identity",
    href: "#services",
    description: "Names, marks and type with a point of view.",
    detail:
      "Strategy, naming, logo, type and a voice that holds up from a favicon to a billboard.",
  },
  {
    title: "Motion & prototyping",
    href: "#services",
    description: "Interfaces that move the way they should feel.",
    detail:
      "Springs, transitions and prototypes you can hold in your hand, so the motion is decided before engineering starts.",
  },
];

export const clients = ["Northwind", "Lumen", "Halcyon", "Orbit", "Kestrel"];

export type Discipline = "product" | "brand" | "motion";

/** `dark` marks the images where glass on top wants white type. */
export const projects: {
  title: string;
  client: string;
  year: string;
  discipline: Discipline;
  image: ThemedSrc;
}[] = [
  {
    title: "A liquid glass library",
    client: "Pane",
    year: "2026",
    discipline: "product",
    image: render("chrome"),
  },
  {
    title: "Night mode for a camera",
    client: "Lumen",
    year: "2026",
    discipline: "motion",
    image: render("vinyl"),
  },
  {
    title: "Identity for a bank",
    client: "Halcyon",
    year: "2025",
    discipline: "brand",
    image: render("silk"),
  },
];

export const currencies = {
  usd: { label: "USD", symbol: "$", rate: 1 },
  eur: { label: "EUR", symbol: "€", rate: 0.92 },
  gbp: { label: "GBP", symbol: "£", rate: 0.79 },
} as const;

export type Currency = keyof typeof currencies;

export const engagements = {
  sprint: [
    {
      name: "Audit",
      price: 6000,
      unit: "one week",
      description: "A close look at your product and a plan to fix it.",
      includes: ["Heuristic review", "Prioritised fixes", "One workshop"],
    },
    {
      name: "Design sprint",
      price: 18000,
      unit: "three weeks",
      featured: true,
      description: "One problem, solved and prototyped end to end.",
      includes: [
        "Research and flows",
        "High-fidelity design",
        "Clickable prototype",
        "Handover in code",
      ],
    },
    {
      name: "Launch",
      price: 42000,
      unit: "eight weeks",
      description: "A product or a site, from brief to release.",
      includes: ["Everything in a sprint", "Build support", "Launch assets"],
    },
  ],
  retainer: [
    {
      name: "Part-time",
      price: 9000,
      unit: "per month",
      description: "A senior designer two days a week.",
      includes: ["Weekly review", "Async feedback", "Shared Figma"],
    },
    {
      name: "Embedded",
      price: 16000,
      unit: "per month",
      featured: true,
      description: "A designer in your standups, every day.",
      includes: [
        "Daily collaboration",
        "Design system upkeep",
        "Roadmap input",
        "Pause any month",
      ],
    },
    {
      name: "Studio",
      price: 30000,
      unit: "per month",
      description: "A small team: design, motion and front-end.",
      includes: ["Three people", "Dedicated lead", "Quarterly offsite"],
    },
  ],
};

export const steps = [
  {
    step: "01",
    title: "Listen",
    description: "A week with your team and your users, before any pixels.",
  },
  {
    step: "02",
    title: "Shape",
    description: "Flows and a direction, reviewed together twice a week.",
  },
  {
    step: "03",
    title: "Ship",
    description: "Design in code, alongside your engineers, until it's live.",
  },
];

export const footer = [
  { title: "Company", links: ["Work", "Services", "Pricing", "Contact"] },
  { title: "Elsewhere", links: ["Dribbble", "GitHub", "LinkedIn", "Read.cv"] },
];
