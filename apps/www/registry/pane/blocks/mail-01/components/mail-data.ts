// Sample mail. Replace it with your own fetches; the components only rely on
// the shapes below.

export type Folder = "inbox" | "drafts" | "sent" | "archive" | "trash";

export interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  /** ISO date-time */
  date: string;
  read: boolean;
  labels: string[];
  folder: Folder;
}

export const folders: { id: Folder; title: string }[] = [
  { id: "inbox", title: "Inbox" },
  { id: "drafts", title: "Drafts" },
  { id: "sent", title: "Sent" },
  { id: "archive", title: "Archive" },
  { id: "trash", title: "Trash" },
];

export const labels = [
  { name: "Work", color: "oklch(0.68 0.15 250)" },
  { name: "Personal", color: "oklch(0.72 0.15 150)" },
  { name: "Travel", color: "oklch(0.75 0.14 70)" },
];

export const mails: Mail[] = [
  {
    id: "m1",
    name: "Olivia Martin",
    email: "olivia@northwind.io",
    subject: "Q4 roadmap review",
    body: "Hi team,\n\nI've put the draft Q4 roadmap in the shared folder. The big change from last quarter is that the billing rewrite moves up to October, which pushes the mobile redesign into November.\n\nCould everyone leave comments by Thursday? I'd like to lock it on Friday's call.\n\nThanks,\nOlivia",
    date: "2026-10-31T09:24:00Z",
    read: false,
    labels: ["Work"],
    folder: "inbox",
  },
  {
    id: "m2",
    name: "Lucas Moreau",
    email: "lucas@atelier.fr",
    subject: "Lisbon in November?",
    body: "Hey!\n\nFlights to Lisbon are oddly cheap for the second week of November. I found a flat in Alfama with a terrace — want to split it? Four nights, Thursday to Monday.\n\nLet me know before the weekend, prices are climbing.\n\nLucas",
    date: "2026-10-31T07:52:00Z",
    read: false,
    labels: ["Personal", "Travel"],
    folder: "inbox",
  },
  {
    id: "m3",
    name: "Stripe",
    email: "receipts@stripe.com",
    subject: "Your receipt from Uniform Interface #4821",
    body: "Thanks for your payment.\n\nAmount paid: $199.00\nDate paid: October 30, 2026\nPayment method: Visa ending 4242\n\nIf you have any questions, contact Uniform Interface at billing@uniform.app.",
    date: "2026-10-30T18:03:00Z",
    read: true,
    labels: [],
    folder: "inbox",
  },
  {
    id: "m4",
    name: "Isabella Nguyen",
    email: "isabella@fieldnotes.co",
    subject: "Re: Interview transcripts",
    body: "Attached are the last three transcripts. Two patterns stood out: people don't trust the totals until they've exported them, and almost nobody finds the filters on mobile.\n\nHappy to walk through the clips tomorrow if that's easier.\n\nIsabella",
    date: "2026-10-30T15:41:00Z",
    read: true,
    labels: ["Work"],
    folder: "inbox",
  },
  {
    id: "m5",
    name: "William Kim",
    email: "will@orbitlabs.dev",
    subject: "Staging is back up",
    body: "Quick heads-up: staging was down for about forty minutes this afternoon after a bad migration. It's rolled back and healthy again. Post-mortem notes are in the incident channel.",
    date: "2026-10-30T13:15:00Z",
    read: true,
    labels: ["Work"],
    folder: "inbox",
  },
  {
    id: "m6",
    name: "Mia Hernández",
    email: "mia@paperplane.mx",
    subject: "Photos from Saturday",
    body: "Finally got through the photos from Saturday — there are a few great ones of everyone on the rooftop. Link below, it expires in a week.\n\nBesos,\nMia",
    date: "2026-10-29T20:07:00Z",
    read: true,
    labels: ["Personal"],
    folder: "inbox",
  },
  {
    id: "m7",
    name: "Daniel Sato",
    email: "daniel@kumo.jp",
    subject: "Design review notes",
    body: "Notes from today's review:\n\n• The empty states need a second pass.\n• Everyone liked the new chart, but the legend fights the title.\n• Let's try the denser table on the orders page.\n\nNext review is in two weeks.",
    date: "2026-10-29T11:30:00Z",
    read: true,
    labels: ["Work"],
    folder: "inbox",
  },
  {
    id: "m8",
    name: "Grace Müller",
    email: "grace@alpen.de",
    subject: "Train tickets",
    body: "Booked us on the 8:12 to Munich. Seats 41 and 42, quiet carriage. I'll send the PDFs the day before.",
    date: "2026-10-28T08:55:00Z",
    read: true,
    labels: ["Travel"],
    folder: "inbox",
  },
  {
    id: "m9",
    name: "You",
    email: "sam@uniform.app",
    subject: "Re: Q4 roadmap review",
    body: "Looks good to me. One question on the billing rewrite: do we still plan to keep the old invoices readable, or migrate them?",
    date: "2026-10-31T10:02:00Z",
    read: true,
    labels: ["Work"],
    folder: "drafts",
  },
  {
    id: "m10",
    name: "You",
    email: "sam@uniform.app",
    subject: "Offsite agenda",
    body: "Here's the agenda for the offsite. Morning is planning, afternoon is free — we booked the boat for four.",
    date: "2026-10-27T16:20:00Z",
    read: true,
    labels: ["Work"],
    folder: "sent",
  },
];
