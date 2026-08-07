import type { Config } from "tailwindcss";

/**
 * "Gamer-Engineer" palette — deliberately restrained.
 * Charcoal base + a disciplined cyan primary and muted amber secondary.
 * These are used as thin schematic lines and low-opacity glows, NOT loud neon.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#0a0b0d", // page background
          900: "#101216", // card base
          800: "#161a20", // raised surface
          700: "#1e232b", // borders / hairlines
        },
        cyan: {
          // primary accent — muted, engineered
          DEFAULT: "#5ce1e6",
          glow: "#7ff0f5",
          dim: "#2b6d70",
        },
        amber: {
          // secondary accent — sparing, for status/warnings
          DEFAULT: "#e6b45c",
          glow: "#f5d07f",
          dim: "#70582b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 0 1px rgba(92,225,230,0.15), 0 0 24px -4px rgba(92,225,230,0.25)",
        "glow-amber": "0 0 0 1px rgba(230,180,92,0.15), 0 0 24px -4px rgba(230,180,92,0.20)",
        "card": "0 10px 40px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-schematic":
          "linear-gradient(rgba(92,225,230,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(92,225,230,0.035) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
