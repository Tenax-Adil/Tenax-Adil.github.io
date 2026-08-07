/**
 * Typed schema for data/portfolio.json — the single source of truth.
 * Edit the JSON, never the components. The `kind` discriminator lets a
 * project be either a "web" build or an "embedded" build with different fields.
 */

export type AccentColor = "cyan" | "amber";

/** A single boot line typed out in the pinned hero terminal. */
export interface BootLine {
  /** Text after the prompt, e.g. "whoami" or "loading modules...". */
  text: string;
  /** "cmd" renders a $ prompt; "out" is plain output; "ok"/"warn" are status colored. */
  type: "cmd" | "out" | "ok" | "warn";
}

export interface Profile {
  name: string;
  handle: string; // terminal-style username, e.g. "adil@dev"
  role: string; // "4th-year Electronics & Computer Engineering student"
  tagline: string;
  location: string;
  status: string; // e.g. "Open to internships"
  boot: BootLine[]; // drives the hero boot sequence
  socials: { label: string; href: string }[];
  resumeUrl?: string;
}

interface ProjectBase {
  id: string;
  title: string;
  summary: string; // one-line, shown on the card
  description: string; // longer, shown when expanded
  tags: string[];
  featured: boolean; // featured => larger bento cell
  accent: AccentColor;
  year: string;
  /** Optional explicit links. liveUrl/repoUrl/demoVideo are auto-appended. */
  links?: { label: string; href: string }[];
}

/** Web / full-stack projects (e.g. the Patient Monitoring System). */
export interface WebProject extends ProjectBase {
  kind: "web";
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  metrics?: { label: string; value: string }[]; // e.g. { label: "Latency", value: "<120ms" }
}

/** Embedded / hardware projects (e.g. the Gas Leakage Detector). */
export interface EmbeddedProject extends ProjectBase {
  kind: "embedded";
  hardware: string[]; // MCUs, sensors, modules
  firmware: string[]; // languages / toolchains
  repoUrl?: string;
  demoVideo?: string;
}

export type Project = WebProject | EmbeddedProject;

/** A skill cluster rendered as a bento cell. */
export interface SkillGroup {
  label: string;
  accent: AccentColor;
  items: string[];
}

export interface StatCell {
  label: string;
  value: string;
  accent: AccentColor;
}

export interface Portfolio {
  profile: Profile;
  stats: StatCell[]; // small metric cells in the bento grid
  skills: SkillGroup[];
  projects: Project[];
  contact: {
    heading: string;
    body: string;
    email: string;
    cta: string;
  };
}
