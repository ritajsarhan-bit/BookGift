import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm "paper" book-store palette
        paper: "#FAF7F2",
        cream: "#F4EEE3",
        ink: {
          DEFAULT: "#1F1B16",
          soft: "#4B463E",
          muted: "#8A8178",
        },
        brand: {
          50: "#FBF3EE",
          100: "#F6E2D6",
          200: "#EBC2AC",
          300: "#DF9E7C",
          400: "#D17A52",
          500: "#C2410C", // primary terracotta
          600: "#A6360A",
          700: "#852C09",
          800: "#65230A",
          900: "#4A1B0A",
        },
        ribbon: {
          DEFAULT: "#8E2D52", // gifting accent (ribbon burgundy)
          soft: "#B85A7C",
        },
        sage: "#5B6B4E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,27,22,0.04), 0 8px 24px rgba(31,27,22,0.06)",
        lift: "0 12px 40px rgba(31,27,22,0.12)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
