import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0A",
          900: "#050505",
          800: "#111111",
          700: "#171717",
        },
        paper: "#FFFFFF",
        muted: "#9A9A9A",
        brand: {
          red: "#E10600",
          hover: "#c90500",
          glow: "#FF1A14",
        },
        neon: {
          pink: "#E10600",
          magenta: "#FF1A14",
          purple: "#E10600",
          blue: "#E10600",
          yellow: "#9A9A9A",
          coral: "#FF1A14",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Roboto", "Helvetica", "Verdana", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(225, 6, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
