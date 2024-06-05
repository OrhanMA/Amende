import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "sand": {
          "50": "#f6f6f6",
          "100": "#efefef",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929",
        },
        "ultramarine": {
          "50": "#f1f3ff",
          "100": "#e5e6ff",
          "200": "#ced1ff",
          "300": "#a7aaff",
          "400": "#7876ff",
          "500": "#4c3fff",
          "600": "#3518ff",
          "700": "#2407fa",
          "800": "#1e05d2",
          "900": "#1a06ac",
          "950": "#0c0091",
        },
      },
    },
  },
  plugins: [],
};
export default config;
