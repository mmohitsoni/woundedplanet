/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1A3D2B",
        "forest-light": "#2D5A3F",
        gold: "#E8C547",
        "gold-dark": "#C9A82C",
        cream: "#F5F0E8",
        "cream-dark": "#EDE8DC",
        earth: "#8B6914",
        bark: "#4A3728",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
