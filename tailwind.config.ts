import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-background-brand-tertiary": "var(--color-background-brand-tertiary)",
        "color-background-default-default-hover": "var(--color-background-default-default-hover)",
        "color-primitives-brand-900": "var(--color-primitives-brand-900)",
        "color-primitives-gray-900": "var(--color-primitives-gray-900)",
        "color-text-brand-on-brand-secondary": "var(--color-text-brand-on-brand-secondary)",
        "color-text-default-default": "var(--color-text-default-default)",
        "variable-collection-bg-grey": "var(--variable-collection-bg-grey)",
      },
    },
  },
  plugins: [],
} satisfies Config;
