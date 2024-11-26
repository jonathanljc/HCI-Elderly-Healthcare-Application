const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "background-start": "rgb(var(--gradient-start))",
        "background-end": "rgb(var(--gradient-end))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "dot-pattern":
          "radial-gradient(rgb(var(--dot-color)) var(--dot-size), transparent 1px)",
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
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "background-shine": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        pulse: {
          "0%": { opacity: 0, transform: "translate(-25%, -25%) scale(0.8)" },
          "100%": { opacity: 1, transform: "translate(25%, 25%) scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        "slide-up": "slide-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "background-shine": "background-shine 8s linear infinite",
        pulse: "pulse 10s ease-in-out infinite alternate",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0, 0, 0, 0.08)",
        glow: "0 0 16px rgba(var(--primary), 0.2)",
        "inner-glow": "inset 0 0 16px rgba(var(--primary), 0.2)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-grid": {
          "background-image": "var(--dot-pattern)",
          "background-size": "var(--grid-size-small) var(--grid-size-small)",
        },
        ".bg-grid-large": {
          "background-image": "var(--dot-pattern)",
          "background-size": "var(--grid-size-large) var(--grid-size-large)",
        },
        ".bg-fade-up": {
          "mask-image": "linear-gradient(to top, transparent, black)",
        },
        ".bg-fade-down": {
          "mask-image": "linear-gradient(to bottom, transparent, black)",
        },
      });
    }),
  ],
};
