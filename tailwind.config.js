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
        secondary: "#71767b",
        ternairy: "#767C86",
        forth: "#67b6d0",
        fifth: "#00030e",
        lightHover: "#e5e5e5",
        darkHover: "#171717",
        postLightHover: "#a35b35",
        postDarkHover: "#171717",
        lightBorder: "#F3F4F6",
        darkBorder: "#262626",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        secondColor: "#ffd400",
        thirdColor: "#f91880",
        forthColor: "#7856ff",
        fifthColor: "#ff7a00",
        sixthColor: "#00ba7c",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "475px",
        xxs: "400px",
        smallSidebar: "max-width: 200px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/bgs/herobg.jpg')",
        "phone-pattern": "url('/src/assets/phone_pattern.jpg')",
      },
      width: {
        110: "440px",
      },
    },
  },
  plugins: [],
}
