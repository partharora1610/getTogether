import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  safelist: [
    "bg-[#dc0e63]",
    "bg-[#FF6B00]",
    "bg-[#ae3ec9]",
    "bg-[#f03e3e]",
    "bg-[#1971c2]",
    "bg-[#099268]",
    "bg-[#0c8599]",
    "hover:bg-[#dc0e63]",
    "hover:bg-[#FF6B00]",
    "hover:bg-[#ae3ec9]",
    "hover:bg-[#f03e3e]",
    "hover:bg-[#1971c2]",
    "hover:bg-[#099268]",
    "hover:bg-[#0c8599]",
    "hover:bg-[#dc0e63]/10",
    "hover:bg-[#FF6B00]/10",
    "hover:bg-[#ae3ec9]/10",
    "hover:bg-[#f03e3e]/10",
    "hover:bg-[#1971c2]/10",
    "hover:bg-[#099268]/10",
    "hover:bg-[#0c8599]/10",
    "bg-[#ae3ec9]/10",
    "bg-[#dc0e63]/10",
    "bg-[#FF6B00]/10",
    "bg-[#f03e3e]/10",
    "bg-[#1971c2]/10",
    "bg-[#099268]/10",
    "bg-[#0c8599]/10",
    "text-[#dc0e63]",
    "text-[#FF6B00]",
    "text-[#ae3ec9]",
    "text-[#f03e3e]",
    "text-[#1971c2]",
    "text-[#099268]",
    "text-[#0c8599]",
    "border-[#dc0e63]",
    "hover:shadow-custom-shadow-#dc0e63",
    "hover:shadow-custom-shadow-#FF6B00",
    "hover:shadow-custom-shadow-#ae3ec9",
    "hover:shadow-custom-shadow-#f03e3e",
    "hover:shadow-custom-shadow-#1971c2",
    "hover:shadow-custom-shadow-#099268",
    "hover:shadow-custom-shadow-#0c8599",
  ],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        "custom-shadow-#dc0e63": "4px 4px 0px 0px rgba(220, 14, 99, 1)",
        "custom-shadow-#FF6B00": "4px 4px 0px 0px rgba(255, 107, 0, 1)",
        "custom-shadow-#ae3ec9": "4px 4px 0px 0px rgba(174, 62, 201, 1)",
        "custom-shadow-#f03e3e": "4px 4px 0px 0px rgba(240, 62, 62, 1)",
        "custom-shadow-#1971c2": "4px 4px 0px 0px rgba(25, 113, 194, 1)",
        "custom-shadow-#099268": "4px 4px 0px 0px rgba(9, 146, 104, 1)",
        "custom-shadow-#0c8599": "4px 4px 0px 0px rgba(12, 133, 153, 1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          400: "#dc0e63",
          500: "#22a78c",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
