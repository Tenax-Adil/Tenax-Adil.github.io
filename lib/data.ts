import portfolioJson from "@/data/portfolio.json";
import type { Portfolio } from "./types";

/**
 * Typed accessor for the portfolio data. Because the JSON is imported
 * statically, updates require only editing data/portfolio.json + a rebuild —
 * no frontend code changes. The cast is the single trust boundary between
 * the raw JSON and the typed component tree.
 */
export const portfolio = portfolioJson as Portfolio;

export const getProfile = () => portfolio.profile;
export const getProjects = () => portfolio.projects;
export const getFeaturedProjects = () =>
  portfolio.projects.filter((p) => p.featured);
export const getSkills = () => portfolio.skills;
export const getStats = () => portfolio.stats;
export const getContact = () => portfolio.contact;
