import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        ms: "780px",
        md: "899px",
        lg: "1230px",
        xl: "1280px",
        "1xl": "1410px",
        "2xl": "1690px",
        "3xl": "2000px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({ layout: { fontSize: {} } })],
};
