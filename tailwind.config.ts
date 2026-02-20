import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        md: {
          primary:                  "var(--md-primary)",
          "on-primary":             "var(--md-on-primary)",
          "primary-container":      "var(--md-primary-container)",
          "on-primary-container":   "var(--md-on-primary-container)",
          secondary:                "var(--md-secondary)",
          "on-secondary":           "var(--md-on-secondary)",
          "secondary-container":    "var(--md-secondary-container)",
          "on-secondary-container": "var(--md-on-secondary-container)",
          tertiary:                 "var(--md-tertiary)",
          "on-tertiary":            "var(--md-on-tertiary)",
          "tertiary-container":     "var(--md-tertiary-container)",
          "on-tertiary-container":  "var(--md-on-tertiary-container)",
          error:                    "var(--md-error)",
          "on-error":               "var(--md-on-error)",
          "error-container":        "var(--md-error-container)",
          surface:                  "var(--md-surface)",
          "surface-dim":            "var(--md-surface-dim)",
          "surface-container-lowest":  "var(--md-surface-container-lowest)",
          "surface-container-low":     "var(--md-surface-container-low)",
          "surface-container":         "var(--md-surface-container)",
          "surface-container-high":    "var(--md-surface-container-high)",
          "surface-container-highest": "var(--md-surface-container-highest)",
          "on-surface":             "var(--md-on-surface)",
          "on-surface-variant":     "var(--md-on-surface-variant)",
          outline:                  "var(--md-outline)",
          "outline-variant":        "var(--md-outline-variant)",
          "inverse-surface":        "var(--md-inverse-surface)",
          "inverse-on-surface":     "var(--md-inverse-on-surface)",
        },
      },
      borderRadius: {
        "md-xs":   "4px",
        "md-sm":   "8px",
        "md-md":   "12px",
        "md-lg":   "16px",
        "md-xl":   "28px",
        "md-full": "9999px",
      },
      animation: {
        "fade-in":       "fade-in 0.5s cubic-bezier(0.2, 0, 0, 1) both",
        "fade-in-scale": "fade-in-scale 0.4s cubic-bezier(0.2, 0, 0, 1) both",
        "slide-up":      "slide-up 0.6s cubic-bezier(0.2, 0, 0, 1) both",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
