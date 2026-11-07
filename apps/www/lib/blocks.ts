import type { ComponentType } from "react";
import DashboardPage from "@/registry/pane/blocks/dashboard-01/page";
import LandingPage from "@/registry/pane/blocks/landing-01/page";
import LoginPage from "@/registry/pane/blocks/login-01/page";
import MailPage from "@/registry/pane/blocks/mail-01/page";
import SettingsPage from "@/registry/pane/blocks/settings-01/page";
import SignupPage from "@/registry/pane/blocks/signup-01/page";

export interface BlockMeta {
  name: string;
  title: string;
  description: string;
  page: ComponentType;
  /** height of the preview frame in px */
  height: number;
  /** false for a page with its own background, that skips the site's backdrop */
  backdrop?: boolean;
}

export const blocks: BlockMeta[] = [
  {
    name: "landing-01",
    title: "Acme",
    description: "The site of Acme, a made-up design studio, built with Pane.",
    page: LandingPage,
    height: 2400,
    backdrop: false,
  },
  {
    name: "dashboard-01",
    title: "Dashboard",
    description:
      "A billing dashboard: a floating sidebar, KPI cards, a revenue chart and an orders table with filters, selection and row actions.",
    page: DashboardPage,
    height: 1180,
  },
  {
    name: "mail-01",
    title: "Mail",
    description:
      "A mail client: folders and labels in a floating sidebar, a searchable list with unread filtering, and a reader with a reply box.",
    page: MailPage,
    height: 760,
  },
  {
    name: "login-01",
    title: "Login",
    description:
      "A two-column sign-in page: the form on one side, a testimonial on clear glass on the other.",
    page: LoginPage,
    height: 760,
  },
  {
    name: "signup-01",
    title: "Signup",
    description:
      "A signup card with passkey and SSO options, a password strength meter and a terms checkbox.",
    page: SignupPage,
    height: 860,
  },
  {
    name: "settings-01",
    title: "Settings",
    description:
      "A settings panel with switches, a theme picker, a language select and a volume slider.",
    page: SettingsPage,
    height: 760,
  },
];

export function getBlock(name: string) {
  return blocks.find((block) => block.name === name);
}
