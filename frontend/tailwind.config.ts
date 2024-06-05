/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        anchor: "#282828",
        pearl: "#DFE4EA",
        reef: "#2D7487",
        shore: "#C0D6D8",
        lightPearl: "#EEF2F6",
        error: "#DC3545",
        success: "#198754",
      },
      fontFamily: {
        sans: ["Poppins"],
      },
    },
  },
  plugins: [],
};
