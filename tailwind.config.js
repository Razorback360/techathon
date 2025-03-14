/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      header: ['Montserrat', 'sans-serif'],
      body: ['Glacial Indifference', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        neon: {
          blue: "#1FB1EA",
          green: "#2FD588",
          darkblue: "#0A1E46",
          offwhite: "#D6D2C4",
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
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        neonPulse: {
          "0%, 100%": {
            textShadow: "0 0 7px rgba(31,177,234,0.3), 0 0 10px rgba(31,177,234,0.3), 0 0 21px rgba(31,177,234,0.3)",
            boxShadow: "0 0 7px rgba(31,177,234,0.3), 0 0 10px rgba(31,177,234,0.3), 0 0 21px rgba(31,177,234,0.3)",
          },
          "50%": {
            textShadow: "0 0 14px rgba(31,177,234,0.5), 0 0 20px rgba(31,177,234,0.5), 0 0 42px rgba(31,177,234,0.5)",
            boxShadow: "0 0 14px rgba(31,177,234,0.5), 0 0 20px rgba(31,177,234,0.5), 0 0 42px rgba(31,177,234,0.5)",
          },
        },
        neonGreenPulse: {
          "0%, 100%": {
            textShadow: "0 0 7px rgba(47,213,136,0.3), 0 0 10px rgba(47,213,136,0.3), 0 0 21px rgba(47,213,136,0.3)",
            boxShadow: "0 0 7px rgba(47,213,136,0.3), 0 0 10px rgba(47,213,136,0.3), 0 0 21px rgba(47,213,136,0.3)",
          },
          "50%": {
            textShadow: "0 0 14px rgba(47,213,136,0.5), 0 0 20px rgba(47,213,136,0.5), 0 0 42px rgba(47,213,136,0.5)",
            boxShadow: "0 0 14px rgba(47,213,136,0.5), 0 0 20px rgba(47,213,136,0.5), 0 0 42px rgba(47,213,136,0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-pulse": "neonPulse 2s infinite",
        "neon-green-pulse": "neonGreenPulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}