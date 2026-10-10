import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#001538",
          900: "#012157", // Deep Navy (Primary Brand Color & Footer)
          800: "#01317A",
          700: "#01429E",
        },
        blue: {
          brand: "#014A94", // Royal Blue (Primary Buttons & Links)
          bright: "#0088E8", // Bright Blue (Active States & Highlights)
        },
        orange: {
          brand: "#FA3A08", // Primary Orange (CTA & Sale Accents)
          golden: "#F9970A", // Golden Orange
        },
        accent: {
          yellow: "#FFB800", // Ratings & Highlights
          green: "#00A23A", // In-stock & Success States
        },
        surface: {
          bg: "#F7F8FA", // Main Page Background
          secondary: "#F3F4F6", // Secondary Background
          card: "#FFFFFF",
          footer: "#012157",
        },
        border: {
          DEFAULT: "#E5E7EB",
          light: "#F1F5F9",
          dark: "#1E293B",
        },
        text: {
          primary: "#111827",
          secondary: "#374151",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1536px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(1, 33, 87, 0.04), 0 1px 2px 0 rgba(1, 33, 87, 0.02)",
        card: "0 2px 4px 0 rgba(1, 33, 87, 0.03), 0 1px 2px 0 rgba(1, 33, 87, 0.02)",
        "card-hover": "0 8px 16px -2px rgba(1, 33, 87, 0.06), 0 4px 6px -2px rgba(1, 33, 87, 0.03)",
        dropdown: "0 10px 25px -5px rgba(1, 33, 87, 0.1), 0 8px 10px -6px rgba(1, 33, 87, 0.05)",
      },
      borderRadius: {
        brand: "8px",
        "brand-lg": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
