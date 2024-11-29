/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#fc4747",
        secondary: "#161d2f",
        tertiary: "#5a698f",
        black: "#10141e",
        white: "#fff",
      },
      screens: {
        xs: "540px",
      },
      fontFamily: {
        outfit: ["Outfit", "serif"],
      },
    },
  },
  plugins: [],
}

