import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: {
        marine: "hsl(213, 96%, 18%)",
        purplish: "hsl(243, 100%, 62%)",
        pastel: "hsl(228, 100%, 84%)",
        light: "hsl(206, 94%, 87%)",
      },
      ["red-strawberry"]: "hsl(354, 84%, 57%)",
      gray: {
        cool: "hsl(231, 11%, 63%)",
        light: "hsl(229, 24%, 87%)",
        magnolia: "hsl(217, 100%, 97%)",
        alabaster: "hsl(231, 100%, 99%)",
      },
      white: "hsl(0, 0%, 100%)",
    },
    extend: {
      backgroundImage: {
        stepper: "url('/img/hero-pattern.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
