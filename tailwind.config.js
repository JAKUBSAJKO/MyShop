/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        "happy-memories-l": "#ff5858",
        "happy-memories-r": "#f09819",
        "nav-grey": "#A6ADAF",
        "nav-grey-200": "#2A303C",
      },
      spacing: {
        "card-420": "26.25rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
