import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
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
      colors: {
        gray: {
          dark: "#000000",
          DEFAULT: "#5C5C5C",
          light: "#E5E5E5",
          white: "#FFFFFF",
        },
        pink: {
          "50": "rgba(255, 0, 174, 0.5)",
          "100": "#E7C0DB",
          "200": "#C698B8",
          "600": "#FF00AE",
          "gradient-start": "#FF97DE",
        },
        violet: {
          "50": "#E2DCE7",
          "100": "#E7C0DB",
          "600": "#6727A6",
          "900": "#3C1661",
        },
        red: {
          "600": "#D23F63",
        },
        green: {
          "600": "#67C076",
        },
        typography: {
          h3: "#775C90",
          h4: "#666666",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-violet": "linear-gradient(135deg, #6727A6 0%, #3C1661 100%)",
        "gradient-violet-text":
          "linear-gradient(135deg, #6727A6 0%, #3C1661 100%)",
        "gradient-logo":
          "linear-gradient(to top, #FFB4F0 16%, rgba(255, 255, 255, 0.9) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        main: "30px",
        secondary: "8px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "h1-mobile": [
          "20px",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
          },
        ],
        "h2-mobile": [
          "16px",
          {
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
          },
        ],
        "h3-mobile": [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
          },
        ],
        "h4-mobile": [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
          },
        ],
        "h1-desktop": [
          "24px",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
          },
        ],
        "h2-desktop": [
          "16px",
          {
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
          },
        ],
        "h3-desktop": [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
          },
        ],
        "h4-desktop": [
          "16px",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
          },
        ],
        "h5-desktop": [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
          },
        ],
      },
      fontWeight: {
        semibold: "600",
        medium: "500",
      },
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "slide-in-from-bottom": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slide-in-from-top": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "fade-in-from-bottom": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "fade-in-from-bottom": "fade-in-from-bottom 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.4s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
