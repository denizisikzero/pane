// Sample data for the dashboard. Replace it with your own fetches; the
// components only rely on the shapes below.

export type OrderStatus = "paid" | "pending" | "refunded" | "failed";

export interface Order {
  id: string;
  customer: string;
  email: string;
  plan: "Starter" | "Pro" | "Team" | "Enterprise";
  status: OrderStatus;
  amount: number;
  /** ISO date */
  date: string;
}

export interface RevenuePoint {
  /** ISO date */
  date: string;
  revenue: number;
  previous: number;
}

/** A tiny seeded PRNG, so the sample numbers are the same on every render. */
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const TODAY = new Date("2026-10-31T00:00:00Z");

function daysAgo(days: number) {
  const date = new Date(TODAY);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

/** 90 days of revenue, with a weekly rhythm and a slow climb. */
export const revenue: RevenuePoint[] = (() => {
  const next = random(7);
  return Array.from({ length: 90 }, (_, i) => {
    const day = 89 - i;
    const weekly = Math.sin((i / 7) * Math.PI * 2) * 420;
    const trend = i * 26;
    return {
      date: daysAgo(day),
      revenue: Math.round(3200 + trend + weekly + next() * 900),
      previous: Math.round(2900 + trend * 0.7 + weekly * 0.8 + next() * 800),
    };
  });
})();

const people = [
  ["Olivia Martin", "olivia@northwind.io"],
  ["Jackson Lee", "jackson@lantern.app"],
  ["Isabella Nguyen", "isabella@fieldnotes.co"],
  ["William Kim", "will@orbitlabs.dev"],
  ["Sofia Davis", "sofia@harbor.studio"],
  ["Mateo Rossi", "mateo@rossi.design"],
  ["Ava Thompson", "ava@brightpath.org"],
  ["Noah Fischer", "noah@kiln.so"],
  ["Mia Hernández", "mia@paperplane.mx"],
  ["Liam O'Brien", "liam@tidewater.ie"],
  ["Emma Johansson", "emma@nordlys.se"],
  ["Lucas Moreau", "lucas@atelier.fr"],
  ["Chloe Wright", "chloe@quarry.co.uk"],
  ["Ethan Park", "ethan@sundial.kr"],
  ["Amelia Costa", "amelia@costa.pt"],
  ["Henry Walker", "henry@foundry.build"],
  ["Zoe Bennett", "zoe@meadow.app"],
  ["Daniel Sato", "daniel@kumo.jp"],
  ["Grace Müller", "grace@alpen.de"],
  ["Leo Silva", "leo@lagoa.com.br"],
  ["Hannah Cohen", "hannah@ledger.fyi"],
  ["Samuel Okafor", "samuel@baobab.ng"],
  ["Ella Novak", "ella@vltava.cz"],
  ["Jack Wilson", "jack@outpost.au"],
] as const;

const plans: Order["plan"][] = ["Starter", "Pro", "Team", "Enterprise"];
const prices: Record<Order["plan"], number> = {
  Starter: 19,
  Pro: 49,
  Team: 199,
  Enterprise: 1290,
};

export const orders: Order[] = (() => {
  const next = random(42);
  return people.map(([customer, email], i) => {
    const plan = plans[Math.floor(next() * plans.length)];
    const roll = next();
    const status: OrderStatus =
      roll < 0.68
        ? "paid"
        : roll < 0.86
          ? "pending"
          : roll < 0.95
            ? "refunded"
            : "failed";
    const seats =
      plan === "Team" || plan === "Enterprise" ? 1 : 1 + Math.floor(next() * 4);
    return {
      id: `INV-${(4821 - i).toString()}`,
      customer,
      email,
      plan,
      status,
      amount: prices[plan] * seats,
      date: daysAgo(Math.floor(i * 1.3)),
    };
  });
})();

export interface Stat {
  title: string;
  value: string;
  /** percent against last month */
  change: number;
  note: string;
  /** true where a fall is the good news, like churn */
  lowerIsBetter?: boolean;
}

export const stats: Stat[] = [
  {
    title: "Revenue",
    value: "$48,294",
    change: 12.4,
    note: "Up on last month, led by Team plans",
  },
  {
    title: "Active customers",
    value: "2,318",
    change: 4.1,
    note: "186 new this month",
  },
  {
    title: "Churn",
    value: "1.9%",
    change: -0.6,
    note: "Lowest since March",
    lowerIsBetter: true,
  },
  {
    title: "Avg. order",
    value: "$212",
    change: -2.3,
    note: "More Starter plans this month",
  },
];
