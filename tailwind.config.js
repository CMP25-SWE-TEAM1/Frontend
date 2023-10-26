// This is for our custom css configurations (extend tailwind)

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1d9bf0",
        secondary: "#9aa1ad",
        tertiary: "#151030",
        forth: "#67b6d0",
        fifth: "#00030e",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "475px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/bgs/herobg.jpg')",
        "phone-pattern": "url('/src/assets/phone_pattern.jpg')",
      },
    },
  },
  plugins: [],
};
