import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0B0B0B",
        "metal-light": "#BFC3C7",
        "metal-mid": "#8E949A",
        wa: "#25D366",
        "wa-hover": "#1EBE5D",
        border: "#eaeaea",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        landing: "1000px",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.07), 0 1px 4px 0 rgba(0,0,0,0.04)",
        "card-hover":
          "0 8px 32px 0 rgba(0,0,0,0.12), 0 2px 8px 0 rgba(0,0,0,0.06)",
        "wa-btn": "0 4px 20px 0 rgba(37,211,102,0.28)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -1%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(1%, -3%)" },
          "70%": { transform: "translate(-2%, 1%)" },
          "80%": { transform: "translate(3%, -2%)" },
          "90%": { transform: "translate(-1%, 3%)" },
        },
        "float-card": {
          "0%, 100%": { transform: "translateY(0px)", boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)" },
          "50%": { transform: "translateY(-6px)", boxShadow: "0 20px 48px 0 rgba(0,0,0,0.22)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        "float-card": "float-card 4s ease-in-out infinite",
        shine: "shine 1.4s linear",
      },
    },
  },
  plugins: [],
};

export default config;
