import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",   // páginas y layouts
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // tus componentes
  ],
  theme: {
    extend: {
      fontFamily: {
        parkinsans: ["var(--font-parkinsans)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
