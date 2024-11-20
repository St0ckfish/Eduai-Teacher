/* eslint-disable @typescript-eslint/no-require-imports */
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "rgba(var(--primary))",
        primaryHover: "rgba(42, 65, 192)", 
        bgSecondary: "rgba(var(--bg-secondary))",
        bgPowderBlue: "rgba(var(--bg-powder-blue))",
        bgGray: "rgba(var(--bg-gray))",
        bgPrimary: "rgba(var(--bg-primary))",
        textPrimary: "rgba(var(--text-primary))",
        textSecondary: "rgba(var(--text-secondary))",
        textMuted: "rgba(var(--text-muted))",
        error: "rgba(var(--error))",
        softRed: "rgba(var(--soft-red))",
        success: "rgba(var(--success))",
        limeGreen: "rgba(var(--limeGreen))",
        info: "rgba(var(--info))",
        warning: "rgba(var(--warning))",
        lavender: "rgba(var(--lavender))",
        borderPrimary: "rgba(var(--border-primary))",
        borderSecondary: "rgba(var(--border-secondary))",
        thead: "rgba(var(--thead))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primaryCN: {
          DEFAULT: "#566df2",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#f5f6fa",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
